import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderStagePageRoutingModule } from './order-stage-routing.module';

import { OrderStagePage } from './order-stage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderStagePageRoutingModule
  ],
  declarations: [OrderStagePage]
})
export class OrderStagePageModule {}
