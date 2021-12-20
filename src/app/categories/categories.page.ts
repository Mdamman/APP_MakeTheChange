import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { DonateService } from "../donate/donate.service";
import firebase from "firebase/app";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: [
    "./styles/categories.page.scss",
    "./styles/categories.shell.scss",
    "./styles/categories.responsive.scss",
  ],
})
export class CategoriesPage {
  counter: number;
  //current user data
  currentUser: firebase.User;

  //projects
  donations: any[];

  constructor(
    private firestore: DonateService,
    private angularFire: AngularFireAuth
  ) {
    this.counter = 0;
    this.donations = [];
  }

  ngOnInit(): void {
    // this.loadProjects();
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
    this.firestore.getCollection("donations").subscribe((data) => {
      if (this.currentUser) {
        this.donations = data.filter(
          (donation) => donation.userId === this.currentUser.email
        );

        this.counter = this.donations.reduce((a, b) => a + b.amount, 0);
      }
    });
  }
}