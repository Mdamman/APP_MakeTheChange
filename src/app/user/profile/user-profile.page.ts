import { Component, OnInit, HostBinding } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { Subscription } from "rxjs";

import {
  IResolvedRouteData,
  ResolverHelper,
} from "../../utils/resolver-helper";
import { UserProfileModel } from "./user-profile.model";
import { AlertController, NavController } from "@ionic/angular";

import { LanguageService } from "../../language/language.service";
import { TranslateService } from "@ngx-translate/core";
import { switchMap } from "rxjs/operators";
import { DonateService } from "../../donate/donate.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.page.html",
  styleUrls: [
    "./styles/user-profile.page.scss",
    "./styles/user-profile.shell.scss",
    "./styles/user-profile.ios.scss",
    "./styles/user-profile.md.scss",
  ],
})
export class UserProfilePage implements OnInit {
  // Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)
  subscriptions: Subscription;

  profile: UserProfileModel;
  available_languages = [];
  translations;

  projects: any[];

  //stats
  totalAmount: number;
  totalContributors: number;

  @HostBinding("class.is-shell") get isShell() {
    return this.profile && this.profile.isShell ? true : false;
  }

  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
    public languageService: LanguageService,
    public alertController: AlertController,
    private nav: Router,
    private firestore: DonateService,
    private angularFire: AngularFireAuth
  ) {
    this.projects = [];
    this.totalAmount = 0;
    this.totalContributors = 0;
  }

  loadProjects() {
    return this.firestore.getCollection("projects").subscribe((data) => {
      this.projects = data;
    });
  }

  loadDonations() {
    this.totalAmount = 0;
    this.totalContributors = 0;

    return this.firestore.getCollection("donations").subscribe((data: any) => {
      console.log(data);

      data.forEach((element) => {
        this.totalAmount += element.amount;
        this.totalContributors += 1;
      });
    });
  }

  // loadProjects() {
  //   this.projects = [
  //     {
  //       id: "project001",
  //       title: "Ecole communale de Plancenoit",
  //       subtitle: "Une ruche scolaire",
  //       imageUrl:
  //         "https://makethechange.be/wp-content/uploads/2021/10/unnamed-2.png",
  //       description: `Immergée au centre de l'école, la ruche ...`,
  //       biodiversityImpact: `        Le lieu d'implémentation de la ruche est étudié pour éviter la
  //       surpopullation des abeilles. Respect du cycle de l'abeille et
  //       minimisation des intéractions avec celle-ci. La ruche Kenyanne adopte un
  //       modèle plus proche de la nature et respectueux de l'abeille.`,
  //       environmentalImpact: `        Le cycle des produits est entièrement local. La cire et la propolis sont
  //       des déchets de la ruche et ceux-ci sont utilisés directement dans la
  //       fabrication des produits.`,
  //       socialEducationalImpact: `Les savons et autres produits sont emballés par la prison de Nivelles.
  //       La ruche possède une vitre pour observer la colonie sans déranger la
  //       ruche. 2 à 4 kg de miel par an sont offert par la ruche.`,
  //       totalContributors: 0,
  //       totalAmount: 0,
  //     },
  //     {
  //       id: "project002",
  //       title: "Prison de Nivelles",
  //       subtitle: "Une ruche humaine",
  //       imageUrl:
  //         "https://makethechange.be/wp-content/uploads/2021/10/prison-nivelles.jpg",
  //       description: `Immergée au centre de la prison, la ruche ...`,
  //       biodiversityImpact: `        Le lieu d'implémentation de la ruche est étudié pour éviter la
  //       surpopullation des abeilles. Respect du cycle de l'abeille et
  //       minimisation des intéractions avec celle-ci. La ruche Kenyanne adopte un
  //       modèle plus proche de la nature et respectueux de l'abeille.`,
  //       environmentalImpact: `        Le cycle des produits est entièrement local. La cire et la propolis sont
  //       des déchets de la ruche et ceux-ci sont utilisés directement dans la
  //       fabrication des produits.`,
  //       socialEducationalImpact: `Les savons et autres produits sont emballés par la prison de Nivelles.
  //       La ruche possède une vitre pour observer la colonie sans déranger la
  //       ruche. 2 à 4 kg de miel par an sont offert par la ruche.`,
  //       totalContributors: 0,
  //       totalAmount: 0,
  //     },
  //   ];

  //   // this.projects.forEach((item) =>
  //   //   this.firestore.addDocument("projects", item)
  //   // );
  // }

  openProject(project: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        project: project,
      },
    };

    this.nav.navigate(["/contact-card"], navigationExtras);
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadDonations();
    this.subscriptions = this.route.data
      .pipe(
        // Extract data for this page
        switchMap((resolvedRouteData: IResolvedRouteData<UserProfileModel>) => {
          return ResolverHelper.extractData<UserProfileModel>(
            resolvedRouteData.data,
            UserProfileModel
          );
        })
      )
      .subscribe(
        (state) => {
          this.profile = state;

          // get translations for this page to use in the Language Chooser Alert
          this.getTranslations();
        },
        (error) => console.log(error)
      );

    this.translate.onLangChange.subscribe(() => this.getTranslations());
  }

  // NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
  // Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
  ionViewWillLeave(): void {
    this.subscriptions.unsubscribe();
  }

  getTranslations() {
    // get translations for this page to use in the Language Chooser Alert
    this.translate
      .getTranslation(this.translate.currentLang)
      .subscribe((translations) => (this.translations = translations));
  }

  async openLanguageChooser() {
    this.available_languages = this.languageService
      .getLanguages()
      .map((item) => ({
        name: item.name,
        type: "radio",
        label: item.name,
        value: item.code,
        checked: item.code === this.translate.currentLang,
      }));

    const alert = await this.alertController.create({
      header: this.translations.SELECT_LANGUAGE,
      inputs: this.available_languages,
      cssClass: "language-alert",
      buttons: [
        {
          text: this.translations.CANCEL,
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: this.translations.OK,
          handler: (data) => {
            if (data) {
              this.translate.use(data);
            }
          },
        },
      ],
    });
    await alert.present();
  }
}

