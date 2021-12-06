import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DonatePageRoutingModule } from "./donate-routing.module";

import { DonatePage } from "./donate.page";
import { environment } from "../../../src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { DonateService } from "./donate.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonatePageRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [DonatePage],
  providers: [DonateService],
})
export class DonatePageModule {}
