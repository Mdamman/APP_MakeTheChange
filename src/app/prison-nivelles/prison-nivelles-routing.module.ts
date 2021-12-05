import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrisonNivellesPage } from './prison-nivelles.page';

const routes: Routes = [
  {
    path: '',
    component: PrisonNivellesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrisonNivellesPageRoutingModule {}
