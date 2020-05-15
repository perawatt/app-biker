import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderCancelPageRoutingModule } from './order-cancel-routing.module';

import { OrderCancelPage } from './order-cancel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderCancelPageRoutingModule
  ],
  declarations: [OrderCancelPage]
})
export class OrderCancelPageModule {}
