import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSendSuccessPageRoutingModule } from './order-send-success-routing.module';

import { OrderSendSuccessPage } from './order-send-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderSendSuccessPageRoutingModule
  ],
  declarations: [OrderSendSuccessPage]
})
export class OrderSendSuccessPageModule {}
