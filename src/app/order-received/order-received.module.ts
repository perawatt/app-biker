import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderReceivedPageRoutingModule } from './order-received-routing.module';

import { OrderReceivedPage } from './order-received.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderReceivedPageRoutingModule
  ],
  declarations: [OrderReceivedPage]
})
export class OrderReceivedPageModule {}
