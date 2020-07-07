import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelledOrderPage } from './cancelled-order.page';

const routes: Routes = [
  {
    path: '',
    component: CancelledOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelledOrderPageRoutingModule {}
