import { Component, OnInit, HostBinding } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
// import { Subscription } from "rxjs";

// import {
//   IResolvedRouteData,
//   ResolverHelper,
// } from "../../utils/resolver-helper";
// import { UserFriendsModel } from "./user-friends.model";
// import { switchMap } from "rxjs/operators";
import { DonateService } from "../../donate/donate.service";
import firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-user-friends",
  templateUrl: "./user-friends.page.html",
  styleUrls: [
    "./styles/user-friends.page.scss",
    "./styles/user-friends.shell.scss",
    "./styles/user-friends.ios.scss",
    "./styles/user-friends.md.scss",
  ],
})
export class UserFriendsPage implements OnInit {
  // Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)
  // subscriptions: Subscription;
  // data: UserFriendsModel;

  // segmentValue = "friends";
  // friendsList: Array<any>;
  // followersList: Array<any>;
  // followingList: Array<any>;
  // searchQuery = "";
  // showFilters = false;

  //all doncations by username
  donations: any[];
  //user total points
  counter: number;
  //current user data
  currentUser: firebase.User;

  //projects
  projects: any[];
  suggested: any[];
  donated: any[];

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    pager: true,
  };

  // @HostBinding("class.is-shell") get isShell() {
  //   return this.data && this.data.isShell ? true : false;
  // }

  constructor(
    private route: ActivatedRoute,
    private firestore: DonateService,
    private angularFire: AngularFireAuth,
    private nav: Router
  ) {
    this.counter = 0;
    this.donations = [];
    this.projects = [];
  }

  ngOnInit(): void {
    // this.loadProjects();
    this.angularFire.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.loadProjects();
      } else {
        this.currentUser = null;
      }
    });

    // this.subscriptions = this.route.data
    //   .pipe(
    //     // Extract data for this page
    //     switchMap((resolvedRouteData: IResolvedRouteData<UserFriendsModel>) => {
    //       return ResolverHelper.extractData<UserFriendsModel>(
    //         resolvedRouteData.data,
    //         UserFriendsModel
    //       );
    //     })
    //   )
    //   .subscribe(
    //     (state) => {
    //       this.data = state;
    //       this.friendsList = this.data.friends;
    //       this.followersList = this.data.followers;
    //       this.followingList = this.data.following;
    //     },
    //     (error) => console.log(error)
    //   );
  }
  loadProjects() {
    this.firestore.getCollection("projects").subscribe((data) => {
      this.projects = data.map((item) => {
        item.totalContributors = 0;
        item.totalAmount = 0;
        item.userAmount = 0;
        return item;
      });

      this.loadDonations();
    });
  }

  openProject(project: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        project: project,
      },
    };

    this.nav.navigate(["/contact-card"], navigationExtras);
  }

  loadDonations() {
    this.firestore.getCollection("donations").subscribe((data) => {
      if (this.currentUser) {
        this.donations = data.filter(
          (donation) => donation.userId === this.currentUser.email
        );

        this.counter = this.donations.reduce((a, b) => a + b.amount, 0);
        this.projects.forEach((project) => {
          let sum = this.donations
            .filter((d) => d.projectId === project.id)
            .reduce((a, b) => a + b.amount, 0);

          project.userAmount = sum ? sum : 0;
        });

        this.donated = this.projects.filter(
          (project) => project?.userAmount !== 0
        );
        this.suggested = this.projects.filter(
          (project) => project?.userAmount === 0
        );
      }
    });
  }
}