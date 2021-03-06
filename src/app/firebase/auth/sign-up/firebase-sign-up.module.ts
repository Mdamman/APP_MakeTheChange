import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";
import { FirebaseSignUpPage } from "./firebase-sign-up.page";
import { ComponentsModule } from "../../../components/components.module";
import { DonateService } from "../../../donate/donate.service";

const routes: Routes = [
  {
    path: "",
    component: FirebaseSignUpPage,
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
  ],
  declarations: [FirebaseSignUpPage],
  providers: [DonateService],
})
export class FirebaseSignUpPageModule {}
