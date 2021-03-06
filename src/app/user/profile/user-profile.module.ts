import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { UserService } from "../user.service";
import { UserProfilePage } from "./user-profile.page";
import { UserProfileResolver } from "./user-profile.resolver";
import { ComponentsModule } from "../../components/components.module";
import { LanguageService } from "../../language/language.service";
import { TranslateModule } from "@ngx-translate/core";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../../environments/environment";
import { DonateService } from "../../donate/donate.service";

const routes: Routes = [
  {
    path: "",
    component: UserProfilePage,
    resolve: {
      data: UserProfileResolver,
    },
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [UserProfilePage],
  providers: [UserProfileResolver, UserService, LanguageService, DonateService],
})
export class UserProfilePageModule {}
