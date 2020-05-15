import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderReceivedPage } from './order-received.page';

const routes: Routes = [
  {
    path: '',
    component: OrderReceivedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderReceivedPageRoutingModule {}
