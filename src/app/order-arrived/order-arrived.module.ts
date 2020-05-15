import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderArrivedPageRoutingModule } from './order-arrived-routing.module';

import { OrderArrivedPage } from './order-arrived.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderArrivedPageRoutingModule
  ],
  declarations: [OrderArrivedPage]
})
export class OrderArrivedPageModule {}
