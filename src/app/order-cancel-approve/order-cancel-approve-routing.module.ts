import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderCancelApprovePage } from './order-cancel-approve.page';

const routes: Routes = [
  {
    path: '',
    component: OrderCancelApprovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderCancelApprovePageRoutingModule {}
