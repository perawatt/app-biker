import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderCancelPendingPage } from './order-cancel-pending.page';

const routes: Routes = [
  {
    path: '',
    component: OrderCancelPendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderCancelPendingPageRoutingModule {}
