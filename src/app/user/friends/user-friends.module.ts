import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ComponentsModule } from "../../components/components.module";

import { UserService } from "../user.service";
import { UserFriendsPage } from "./user-friends.page";
import { UserFriendsResolver } from "./user-friends.resolver";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../../environments/environment";
import { DonateService } from "../../donate/donate.service";

const routes: Routes = [
  {
    path: "",
    component: UserFriendsPage,
    resolve: {
      data: UserFriendsResolver,
    },
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [UserFriendsPage],
  providers: [UserFriendsResolver, UserService, DonateService],
})
export class UserFriendsPageModule {}
