import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderAdminContactPage } from './order-admin-contact.page';

const routes: Routes = [
  {
    path: '',
    component: OrderAdminContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderAdminContactPageRoutingModule {}
