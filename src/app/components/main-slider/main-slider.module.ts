import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainSliderComponent } from './main-slider.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [MainSliderComponent],
  exports: [MainSliderComponent]
})
export class MainSliderComponentModule {}
