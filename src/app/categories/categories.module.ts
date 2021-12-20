import { IonicModule } from "@ionic/angular";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsModule } from "../components/components.module";

import { CategoriesPage } from "./categories.page";
import { DonateService } from "../donate/donate.service";

const categoriesRoutes: Routes = [
  {
    path: "",
    component: CategoriesPage,
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(categoriesRoutes),
    ComponentsModule,
  ],
  declarations: [CategoriesPage],
  providers: [DonateService],
})
export class CategoriesPageModule {}
