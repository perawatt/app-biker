import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderRestaurantContactPageRoutingModule } from './order-restaurant-contact-routing.module';

import { OrderRestaurantContactPage } from './order-restaurant-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderRestaurantContactPageRoutingModule
  ],
  declarations: [OrderRestaurantContactPage]
})
export class OrderRestaurantContactPageModule {}
