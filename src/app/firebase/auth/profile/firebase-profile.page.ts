import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController, ToastController } from "@ionic/angular";
import { DonateService } from "../../../donate/donate.service";
import firebase from "firebase/app";
import { Camera, CameraResultType } from "@capacitor/camera";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize, first } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { FirebaseAuthService } from "../firebase-auth.service";

@Component({
  selector: "app-firebase-profile",
  templateUrl: "./firebase-profile.page.html",
  styleUrls: [
    "./styles/firebase-profile.page.scss",
    "./styles/firebase-profile.shell.scss",
  ],
})
export class FirebaseProfilePage implements OnInit {
  profileForm: FormGroup;
  currentUser: firebase.User;
  avatar: any;
  profile: any;
  constructor(
    private formBuilder: FormBuilder,
    private firestore: DonateService,
    private angularFire: AngularFireAuth,
    private storage: AngularFireStorage,
    public toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    public authService: FirebaseAuthService
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      about: [""],
      
    });
  }

  ngOnInit() {
    this.angularFire.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.fetchProfile();
      } else {
        this.currentUser = null;
      }
    });
  }

  async fetchProfile() {
    this.profile = await this.firestore
      .getDocument("users", this.currentUser.uid)
      .pipe(first())
      .toPromise();

    if (this.profile) {
      this.avatar =
        this.profile.avatar ||
        "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
      this.profileForm.patchValue({
        firstName: this.profile.firstName || "",
        lastName: this.profile.lastName || "",
        about: this.profile.about || "",
       
      });
    }
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  saveProfile() {
    //this.firestore.setDocument();

    if (this.profileForm.valid) {
      let userProfileObject = {
        ...this.profileForm.value,
        avatar: this.avatar,
      };

      this.firestore
        .setDocument("users", this.currentUser.uid, userProfileObject)
        .then(() => {
          console.log("saved");
          this.presentToast("Votre profil est mis à jour");
        })
        .catch((err) => {
          console.log(err);
          this.presentToast("Something went wrong please try again");
        });
    }
  }
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

    if (image.base64String) this.uploadImage(image.base64String);

    // Can be set to the src of an image now
  }

  uploadImage(imageData) {
    const filePath = `media/images/${this.currentUser.uid}/image_${this.currentUser.uid}.jpg`;
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.putString(imageData, "base64");
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log(url);
            this.avatar = url;
            if (this.avatar) this.presentToast("Photo Uploaded Successfully");
            else this.presentToast("Something went wrong please upload again");
          });
        })
      )
      .subscribe();
  }

  signOut() {
    this.authService.signOut().subscribe(
      () => {
        // Sign-out successful.
        // Replace state as we are no longer authorized to access profile page.
        this.router.navigate(["firebase/auth/sign-in"], { replaceUrl: true });
      },
      (error) => {
        console.log("signout error", error);
      }
    );
  }
}

