import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EditProfilePageRoutingModule } from "./edit-profile-routing.module";

import { EditProfilePage } from "./edit-profile.page";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../environments/environment";
import { DonateService } from "../donate/donate.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilePageRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [EditProfilePage],
  providers: [DonateService],
})
export class EditProfilePageModule {}
