import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { LoadingController, NavController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { DonateService } from "./donate.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-donate",
  templateUrl: "./donate.page.html",
  styleUrls: ["./donate.page.scss"],
})
export class DonatePage implements OnInit {
  counter: number;
  currentUser: firebase.User;
  project: any;
  profile: any;

  constructor(
    private angularFire: AngularFireAuth,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private nav: NavController,
    private firestore: DonateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.project = this.router.getCurrentNavigation().extras.state.project;
      }
    });

    this.counter = 0;

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

  ngOnInit(): void {
    console.log();
    this.loadDonations();
  }

  add() {
    this.counter++;
  }
  remove() {
    this.counter--;
    if (this.counter < 0) this.counter = 0;
  }

  async validate() {
    if (this.counter > 0) {
      this.presentLoading();
    } else {
      const alert = await this.alertController.create({
        header: "Alert",
        message: "Amount should be greater than Zero",
        buttons: ["Ok"],
      });

      await alert.present();
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Un instant, nous implémentons vos abeilles...",
      duration: 2000,
    });
    await loading.present();

    await this.addDonationToFirestore();
    const { role, data } = await loading.onDidDismiss();
    console.log("Loading dismissed!");
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Félicitations",
      message:
        "Rendez-vous sur votre tableau de bord pour visualiser votre impact !",
      buttons: ["Vers mon tableau de bord"],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
    this.nav.navigateBack(["/app/user/friends"]);
  }

  addDonationToFirestore() {
    let data = {
      projectId: this.project?.id,
      projectName: this.project?.title,
      projectImage: this.project?.imageUrl,
      userId: this.currentUser?.email,
      userName: this.profile?.nickname
        ? this.profile?.nickname
        : this.currentUser?.displayName
        ? this.currentUser?.displayName
        : this.profile?.firstName
        ? this.profile?.firstName
        : this.currentUser?.email,
      amount: this.counter,
      timestamp: Date.now(),
      photoUrl: this.profile?.avatar ? this.profile?.avatar : "",

      profile: this.profile,
    };
    return this.firestore.addDocument(`donations`, data);
  }

  loadDonations() {
    return this.firestore
      .getCollection("donations")
      .subscribe((data) => console.log(data));
  }
}