import { Component, OnInit, NgZone } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { MenuController, LoadingController } from "@ionic/angular";
import { PasswordValidator } from "../../../validators/password.validator";
import { FirebaseAuthService } from "../firebase-auth.service";
import { Subscription } from "rxjs";
import { DonateService } from "../../../donate/donate.service";

@Component({
  selector: "app-firebase-sign-up",
  templateUrl: "./firebase-sign-up.page.html",
  styleUrls: ["./styles/firebase-sign-up.page.scss"],
})
export class FirebaseSignUpPage implements OnInit {
  signupForm: FormGroup;
  matching_passwords_group: FormGroup;
  submitError: string;
  redirectLoader: HTMLIonLoadingElement;
  authRedirectResult: Subscription;
  allNicknames = [];
  isAvailable = true;

  validation_messages = {
    nickname: [{ type: "required", message: "Pseudo obligatoire" }],
    email: [
      { type: "required", message: "Email obligatoire" },
      { type: "pattern", message: "Veuillez entrer une adresse email valide" },
    ],
    password: [
      { type: "required", message: "Mot de passe obligatoire" },
      {
        type: "minlength",
        message: "Le mot de passe doit contenir au moins 6 caractères",
      },
    ],
    confirm_password: [
      { type: "required", message: "Confirmez votre mot de passe" },
    ],
    matching_passwords: [{ type: "areNotEqual", message: "Mot de passe incorrect" }],
  };

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public menu: MenuController,
    public authService: FirebaseAuthService,
    private ngZone: NgZone,
    public loadingController: LoadingController,
    public location: Location,
    private firestore: DonateService
  ) {
    this.matching_passwords_group = new FormGroup(
      {
        password: new FormControl(
          "",
          Validators.compose([Validators.minLength(6), Validators.required])
        ),
        confirm_password: new FormControl("", Validators.required),
      },
      (formGroup: FormGroup) => {
        return PasswordValidator.areNotEqual(formGroup);
      }
    );

    this.signupForm = new FormGroup({
      nickname: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
      matching_passwords: this.matching_passwords_group,
    });

    // Get firebase authentication redirect result invoken when using signInWithRedirect()
    // signInWithRedirect() is only used when client is in web but not desktop
    this.authRedirectResult = this.authService
      .getRedirectResult()
      .subscribe((result) => {
        if (result.error) {
          this.manageAuthWithProvidersErrors(result.error);
        } else {
          this.redirectLoggedUserToProfilePage();
        }
      });

    // Check if url contains our custom 'auth-redirect' param, then show a loader while we receive the getRedirectResult notification
    this.route.queryParams.subscribe((params) => {
      const authProvider = params["auth-redirect"];
      if (authProvider) {
        this.presentLoading(authProvider);
      }
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
    this.loadNickNames();
  }

  loadNickNames() {
    return this.firestore.getCollection("users").subscribe((data: any) => {
      this.allNicknames = data.map((user) => user.nickname.toLowerCase());
      this.signupForm.valueChanges.subscribe((data) => {
        if (data?.nickname) {
          if (this.allNicknames.includes(data?.nickname?.toLowerCase())) {
            this.isAvailable = false;
          } else this.isAvailable = true;
        }
      });
    });
  }

  // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // hide the loader and redirect the user to the profile page
  redirectLoggedUserToProfilePage() {
    this.dismissLoading();

    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      // Get previous URL from our custom History Helper
      // If there's no previous page, then redirect to profile
      // const previousUrl = this.historyHelper.previousUrl || 'firebase/auth/profile';
      const previousUrl = "firebase/auth/profile";

      // No need to store in the navigation history the sign-in page with redirect params (it's justa a mandatory mid-step)
      // Navigate to profile and replace current url with profile
      this.router.navigate([previousUrl], { replaceUrl: true });
    });
  }

  async presentLoading(authProvider?: string) {
    const authProviderCapitalized =
      authProvider[0].toUpperCase() + authProvider.slice(1);
    this.redirectLoader = await this.loadingController.create({
      message: authProvider
        ? "Signing up with " + authProviderCapitalized
        : "Signin up ...",
      duration: 4000,
    });
    await this.redirectLoader.present();
  }

  async dismissLoading() {
    if (this.redirectLoader) {
      await this.redirectLoader.dismiss();
    }
  }

  resetSubmitError() {
    this.submitError = null;
  }

  // Before invoking auth provider redirect flow, present a loading indicator and add a flag to the path.
  // The precense of the flag in the path indicates we should wait for the auth redirect to complete.
  prepareForAuthWithProvidersRedirection(authProvider: string) {
    this.presentLoading(authProvider);

    this.location.go(
      this.location.path(),
      "auth-redirect=" + authProvider,
      this.location.getState()
    );
  }

  manageAuthWithProvidersErrors(errorMessage: string) {
    this.submitError = errorMessage;
    // remove auth-redirect param from url
    this.location.replaceState(this.router.url.split("?")[0], "");
    this.dismissLoading();
  }

  saveProfile(user, nickname) {
    //this.firestore.setDocument();

    if (!nickname) return;

    let userProfileObject = {
      nickname: nickname,
    };

    return this.firestore.setDocument("users", user.uid, userProfileObject);
  }

  signUpWithEmail(): void {
    this.resetSubmitError();
    const values = this.signupForm.value;
    this.authService
      .signUpWithEmail(values.email, values.matching_passwords.password)
      .then((user) => {
        // navigate to user profile

        console.log(user.user.uid);

        this.saveProfile(user.user, values.nickname);

        this.redirectLoggedUserToProfilePage();
      })
      .catch((error) => {
        this.submitError = error.message;
      });
  }

  doFacebookSignup(): void {
    this.resetSubmitError();
    this.prepareForAuthWithProvidersRedirection("facebook");

    this.authService.signInWithFacebook().subscribe(
      (result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const token = result.credential.accessToken;
        this.redirectLoggedUserToProfilePage();
      },
      (error) => {
        this.manageAuthWithProvidersErrors(error.message);
      }
    );
  }

  doGoogleSignup(): void {
    this.resetSubmitError();
    this.prepareForAuthWithProvidersRedirection("google");

    this.authService.signInWithGoogle().subscribe(
      (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        this.redirectLoggedUserToProfilePage();
      },
      (error) => {
        console.log(error);
        this.manageAuthWithProvidersErrors(error.message);
      }
    );
  }

  doTwitterSignup(): void {
    this.resetSubmitError();
    this.prepareForAuthWithProvidersRedirection("twitter");

    this.authService.signInWithTwitter().subscribe(
      (result) => {
        // This gives you a Twitter Access Token. You can use it to access the Twitter API.
        // var token = result.credential.accessToken;
        this.redirectLoggedUserToProfilePage();
      },
      (error) => {
        console.log(error);
        this.manageAuthWithProvidersErrors(error.message);
      }
    );
  }

  doAppleSignup(): void {
    this.resetSubmitError();
    this.prepareForAuthWithProvidersRedirection("apple");

    this.authService.signInWithApple().subscribe(
      (result) => {
        this.redirectLoggedUserToProfilePage();
      },
      (error) => {
        console.log(error);
        this.manageAuthWithProvidersErrors(error.message);
      }
    );
  }
}

