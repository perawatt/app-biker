import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderCustomerContactPage } from './order-customer-contact.page';

const routes: Routes = [
  {
    path: '',
    component: OrderCustomerContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderCustomerContactPageRoutingModule {}
