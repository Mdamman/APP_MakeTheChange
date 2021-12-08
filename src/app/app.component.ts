import { Component } from "@angular/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { SeoService } from "./utils/seo/seo.service";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { HistoryHelperService } from "./utils/history-helper.service";
import { DonateService } from "./donate/donate.service";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { first } from "rxjs/operators";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: [
    "./side-menu/styles/side-menu.scss",
    "./side-menu/styles/side-menu.shell.scss",
    "./side-menu/styles/side-menu.responsive.scss",
  ],
})
export class AppComponent {
  appPages = [
    
    {title: "Accueil",
    url: "/app/user/profil",
    ionicIcon: "home-outline",
  },

    
    {
      title: "Tableau de bord",
      url: "/app/user",
      customIcon: "./assets/custom-icons/side-menu/contact-card.svg",
    },
    
    {title: "Contreparties",
    url: "/app/categories",
    ionicIcon: "bag-handle-outline",},
    
    {
      title: "Blog",
      url: "/posts",
      ionicIcon: "reader-outline",
    },
    {
      title: "Notifications",
      url: "/app/notifications",
      ionicIcon: "notifications-outline",
    },
    {
      title: "Profil",
      url: "/firebase/auth/profile",
      ionicIcon: "person-outline",
    },
    {
      title: "Donations",
      url: "/donation-list",
      ionicIcon: "list-outline",
    },
    // {
    //   title: "Edit Profile",
    //   url: "/edit-profile",
    //   ionicIcon: "person-outline",
    // },
  ];
  accountPages = [
    {
      title: "Log In",
      url: "/auth/login",
      ionicIcon: "log-in-outline",
    },
    {
      title: "Sign Up",
      url: "/auth/signup",
      ionicIcon: "person-add-outline",
    },
    {
      title: "Tutorial",
      url: "/walkthrough",
      ionicIcon: "school-outline",
    },
    {
      title: "Getting Started",
      url: "/getting-started",
      ionicIcon: "rocket-outline",
    },
    {
      title: "404 page",
      url: "/page-not-found",
      ionicIcon: "alert-circle-outline",
    },
  ];

  textDir = "ltr";
  profile: any;
  currentUser: firebase.User;
  // Inject HistoryHelperService in the app.components.ts so its available app-wide
  constructor(
    public translate: TranslateService,
    public historyHelper: HistoryHelperService,
    private seoService: SeoService,
    private firestore: DonateService,
    private angularFire: AngularFireAuth
  ) {
    this.initializeApp();
    this.setLanguage();

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
  }

  async initializeApp() {
    try {
      await SplashScreen.hide();
    } catch (err) {
      console.log("This is normal in a browser", err);
    }
  }

  setLanguage() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang("en");

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use("en");

    // this is to determine the text direction depending on the selected language
    // for the purpose of this example we determine that only arabic and hebrew are RTL.
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   this.textDir = (event.lang === 'ar' || event.lang === 'iw') ? 'rtl' : 'ltr';
    // });
  }
}
