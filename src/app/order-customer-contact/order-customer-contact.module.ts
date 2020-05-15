import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderCustomerContactPageRoutingModule } from './order-customer-contact-routing.module';

import { OrderCustomerContactPage } from './order-customer-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderCustomerContactPageRoutingModule
  ],
  declarations: [OrderCustomerContactPage]
})
export class OrderCustomerContactPageModule {}
