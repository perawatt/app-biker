import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderShippingPage } from './order-shipping.page';

const routes: Routes = [
  {
    path: '',
    component: OrderShippingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderShippingPageRoutingModule {}
