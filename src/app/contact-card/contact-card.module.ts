import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ContactCardPage } from "./contact-card.page";
import { ComponentsModule } from "../components/components.module";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../environments/environment";
import { DonateService } from "../donate/donate.service";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([{ path: "", component: ContactCardPage }]),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [ContactCardPage],
  providers: [DonateService],
})
export class ContactCardPageModule {}
