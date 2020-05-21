import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderCancelPageRoutingModule } from './order-cancel-routing.module';

import { OrderCancelPage } from './order-cancel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OrderCancelPageRoutingModule
  ],
  declarations: [OrderCancelPage]
})
export class OrderCancelPageModule {}
