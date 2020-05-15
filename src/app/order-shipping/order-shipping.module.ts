import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderShippingPageRoutingModule } from './order-shipping-routing.module';

import { OrderShippingPage } from './order-shipping.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderShippingPageRoutingModule
  ],
  declarations: [OrderShippingPage]
})
export class OrderShippingPageModule {}
