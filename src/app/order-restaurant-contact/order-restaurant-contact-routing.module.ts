import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderRestaurantContactPage } from './order-restaurant-contact.page';

const routes: Routes = [
  {
    path: '',
    component: OrderRestaurantContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRestaurantContactPageRoutingModule {}
