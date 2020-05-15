import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderCancelPendingPageRoutingModule } from './order-cancel-pending-routing.module';

import { OrderCancelPendingPage } from './order-cancel-pending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderCancelPendingPageRoutingModule
  ],
  declarations: [OrderCancelPendingPage]
})
export class OrderCancelPendingPageModule {}
