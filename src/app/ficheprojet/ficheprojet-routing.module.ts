import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FicheprojetPage } from './ficheprojet.page';

const routes: Routes = [
  {
    path: '',
    component: FicheprojetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FicheprojetPageRoutingModule {}
