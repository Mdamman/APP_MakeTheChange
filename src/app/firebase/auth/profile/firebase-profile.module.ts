import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "../../../components/components.module";
import { FirebaseProfilePage } from "./firebase-profile.page";
import { FirebaseProfileResolver } from "./firebase-profile.resolver";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";
import { DonateService } from "../../../donate/donate.service";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../../../environments/environment";

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(["/firebase/auth/sign-in"]);

const routes: Routes = [
  {
    path: "",
    component: FirebaseProfilePage,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: {
      data: FirebaseProfileResolver,
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [FirebaseProfilePage],
  providers: [FirebaseProfileResolver, DonateService],
})
export class FirebaseProfilePageModule {}
