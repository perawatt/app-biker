import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSendSuccessPage } from './order-send-success.page';

const routes: Routes = [
  {
    path: '',
    component: OrderSendSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderSendSuccessPageRoutingModule {}
