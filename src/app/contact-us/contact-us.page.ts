import { Component, NgZone, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import {
  MenuController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { Subscription } from "rxjs";
import { DonateService } from "../donate/donate.service";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { first } from "rxjs/operators";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.page.html",
  styleUrls: ["./contact-us.page.scss"],
})
export class ContactUsPage implements OnInit {
  signupForm: FormGroup;
  currentUser: firebase.User;
  isAvailable = true;
  profile: any;

  validation_messages = {
    title: [{ type: "required", message: "Veuillez entrer un objet" }],
    message: [{ type: "required", message: "Veuillez entrer un message" }],
  };

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public menu: MenuController,
    private ngZone: NgZone,
    public loadingController: LoadingController,
    public location: Location,
    private firestore: DonateService,
    private angularFire: AngularFireAuth,
    public toastController: ToastController
  ) {
    this.signupForm = new FormGroup({
      title: new FormControl("", Validators.compose([Validators.required])),
      message: new FormControl("", Validators.compose([Validators.required])),
    });

    this.angularFire.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.fetchProfile();
      } else {
        this.currentUser = null;
      }
    });
  }

  ngOnInit(): void {}

  async fetchProfile() {
    this.profile = await this.firestore
      .getDocument("users", this.currentUser.uid)
      .pipe(first())
      .toPromise();
  }

  async submit() {
    console.log(this.signupForm.value);

    const formData = {
      user: {
        email: this.currentUser.email,
        id: this.currentUser.uid,
        profile: this.profile,
      },
      ...this.signupForm.value,
    };
    await this.firestore.addDocument("contactform", formData);

    this.signupForm.reset();

    this.presentToast("Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.");
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
