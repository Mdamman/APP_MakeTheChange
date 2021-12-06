import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { DonateService } from "../donate/donate.service";
import firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
@Component({
  selector: "app-contact-card",
  templateUrl: "./contact-card.page.html",
  styleUrls: [
    "./styles/contact-card.page.scss",
    "./styles/contact-card.shell.scss",
  ],
})
export class ContactCardPage implements OnInit {
  project: any;
  donations: any[];
  //user total points
  counter: number;
  //current user data
  currentUser: firebase.User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: DonateService,
    private angularFire: AngularFireAuth
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.project = this.router.getCurrentNavigation().extras.state.project;
      }
    });

    this.counter = 0;
    this.donations = [];
  }

  ngOnInit() {
    this.angularFire.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.loadDonations();
      } else {
        this.currentUser = null;
      }
    });
  }

  loadDonations() {
    return this.firestore.getCollection("donations").subscribe((data) => {
      if (this.currentUser) {
        this.donations = data.filter(
          (donation) => donation.projectId === this.project.id
        );

        this.counter = this.donations.reduce((a, b) => a + b.amount, 0);
      }
    });
  }

  donate(project: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        project,
      },
    };

    this.router.navigate(["/donate"], navigationExtras);
  }
}

