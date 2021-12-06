import { Component, OnInit, HostBinding } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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

  // @HostBinding("class.is-shell") get isShell() {
  //   return this.data && this.data.isShell ? true : false;
  // }

  constructor(
    private route: ActivatedRoute,
    private firestore: DonateService,
    private angularFire: AngularFireAuth
  ) {
    this.counter = 0;
    this.donations = [];
    this.projects = [];
  }

  ngOnInit(): void {
    this.loadProjects();
    this.angularFire.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.loadDonations();
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

  loadDonations() {
    return this.firestore.getCollection("donations").subscribe((data) => {
      if (this.currentUser) {
        this.donations = data.filter(
          (donation) => donation.userId === this.currentUser.email
        );
        console.log(this.donations);

        this.counter = this.donations.reduce((a, b) => a + b.amount, 0);
        this.projects.forEach((project) => {
          let sum = this.donations
            .filter((d) => d.projectId === project.id)
            .reduce((a, b) => a + b.amount, 0);

          project.userAmount = sum ? sum : 0;
        });

        console.log(this.counter);
      }
    });
  }

  loadProjects() {
    this.projects = [
      {
        id: "project001",
        title: "Ecole communale de Plancenoit",
        subtitle: "Une ruche scolaire",
        imageUrl:
          "https://makethechange.be/wp-content/uploads/2021/10/unnamed-2.png",
        description: `Immergée au centre de l'école, la ruche ...`,
        biodiversityImpact: `        Le lieu d'implémentation de la ruche est étudié pour éviter la
        surpopullation des abeilles. Respect du cycle de l'abeille et
        minimisation des intéractions avec celle-ci. La ruche Kenyanne adopte un
        modèle plus proche de la nature et respectueux de l'abeille.`,
        environmentalImpact: `        Le cycle des produits est entièrement local. La cire et la propolis sont
        des déchets de la ruche et ceux-ci sont utilisés directement dans la
        fabrication des produits.`,
        socialEducationalImpact: `Les savons et autres produits sont emballés par la prison de Nivelles.
        La ruche possède une vitre pour observer la colonie sans déranger la
        ruche. 2 à 4 kg de miel par an sont offert par la ruche.`,
        totalContributors: 0,
        totalAmount: 0,
        userAmount: 0,
      },
      {
        id: "project002",
        title: "Prison de Nivelles",
        subtitle: "Une ruche humaine",
        imageUrl:
          "https://makethechange.be/wp-content/uploads/2021/10/prison-nivelles.jpg",
        description: `Immergée au centre de la prison, la ruche ...`,
        biodiversityImpact: `        Le lieu d'implémentation de la ruche est étudié pour éviter la
        surpopullation des abeilles. Respect du cycle de l'abeille et
        minimisation des intéractions avec celle-ci. La ruche Kenyanne adopte un
        modèle plus proche de la nature et respectueux de l'abeille.`,
        environmentalImpact: `        Le cycle des produits est entièrement local. La cire et la propolis sont
        des déchets de la ruche et ceux-ci sont utilisés directement dans la
        fabrication des produits.`,
        socialEducationalImpact: `Les savons et autres produits sont emballés par la prison de Nivelles.
        La ruche possède une vitre pour observer la colonie sans déranger la
        ruche. 2 à 4 kg de miel par an sont offert par la ruche.`,
        totalContributors: 0,
        totalAmount: 0,
        userAmount: 0,
      },
    ];
  }

  // segmentChanged(ev): void {
  //   this.segmentValue = ev.detail.value;

  //   // Check if there's any filter and apply it
  //   this.searchList();
  // }

  // searchList(): void {
  //   const query =
  //     this.searchQuery && this.searchQuery !== null ? this.searchQuery : "";

  //   if (this.segmentValue === "friends") {
  //     this.friendsList = this.filterList(this.data.friends, query);
  //   } else if (this.segmentValue === "followers") {
  //     this.followersList = this.filterList(this.data.followers, query);
  //   } else if (this.segmentValue === "following") {
  //     this.followingList = this.filterList(this.data.following, query);
  //   }
  // }

  // filterList(list, query): Array<any> {
  //   return list.filter((item) =>
  //     item.name.toLowerCase().includes(query.toLowerCase())
  //   );
  // }

  // NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
  // Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
  // ionViewWillLeave(): void {
  //   this.subscriptions.unsubscribe();
  // }
}
