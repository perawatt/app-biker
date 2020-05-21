import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderCancelApprovePageRoutingModule } from './order-cancel-approve-routing.module';

import { OrderCancelApprovePage } from './order-cancel-approve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderCancelApprovePageRoutingModule
  ],
  declarations: [OrderCancelApprovePage]
})
export class OrderCancelApprovePageModule {}
