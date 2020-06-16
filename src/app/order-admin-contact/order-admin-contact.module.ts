import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderAdminContactPageRoutingModule } from './order-admin-contact-routing.module';

import { OrderAdminContactPage } from './order-admin-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderAdminContactPageRoutingModule
  ],
  declarations: [OrderAdminContactPage]
})
export class OrderAdminContactPageModule {}
