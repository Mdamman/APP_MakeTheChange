import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { DonateService } from "../donate/donate.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.page.html",
  styleUrls: [
    "./styles/notifications.page.scss",
    "./styles/notifications.shell.scss",
  ],
})
export class NotificationsPage implements OnInit {
  donations: any[];
  currentUser: any;
  constructor(
    private route: ActivatedRoute,
    private firestore: DonateService,
    private angularFire: AngularFireAuth
  ) {
    this.donations = [];
  }

  ngOnInit(): void {
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

        console.log(this.donations);
      }
    });
  }

  // NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
  // Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
  ionViewWillLeave(): void {}
}
