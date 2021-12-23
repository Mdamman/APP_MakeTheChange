import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsModule } from "../components/components.module";

import { NotificationsPage } from "./notifications.page";
import { NotificationsResolver } from "../notifications/notifications.resolver";
import { NotificationsService } from "../notifications/notifications.service";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../environments/environment";
import { DonateService } from "../donate/donate.service";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forChild([
      {
        path: "",
        component: NotificationsPage,
        resolve: {
          data: NotificationsResolver,
        },
      },
    ]),
  ],
  declarations: [NotificationsPage],
  providers: [NotificationsResolver, NotificationsService, DonateService],
})
export class NotificationsPageModule {}