import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrisonNivellesPageRoutingModule } from './prison-nivelles-routing.module';

import { PrisonNivellesPage } from './prison-nivelles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrisonNivellesPageRoutingModule
  ],
  declarations: [PrisonNivellesPage]
})
export class PrisonNivellesPageModule {}
