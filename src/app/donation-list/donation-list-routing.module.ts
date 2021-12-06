import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonationListPage } from './donation-list.page';

const routes: Routes = [
  {
    path: '',
    component: DonationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationListPageRoutingModule {}