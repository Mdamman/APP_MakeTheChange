import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FicheprojetPageRoutingModule } from './ficheprojet-routing.module';

import { FicheprojetPage } from './ficheprojet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FicheprojetPageRoutingModule
  ],
  declarations: [FicheprojetPage]
})
export class FicheprojetPageModule {}
