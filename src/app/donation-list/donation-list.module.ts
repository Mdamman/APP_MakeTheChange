import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DonationListPageRoutingModule } from "./donation-list-routing.module";

import { DonationListPage } from "./donation-list.page";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../environments/environment";
import { DonateService } from "../donate/donate.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFireModule.initializeApp(environment.firebase),
    DonationListPageRoutingModule,
  ],
  declarations: [DonationListPage],
  providers: [DonateService],
})
export class DonationListPageModule {}
