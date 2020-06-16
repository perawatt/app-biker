import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderTimeOutPage } from './order-time-out.page';

const routes: Routes = [
  {
    path: '',
    component: OrderTimeOutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderTimeOutPageRoutingModule {}
