import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderCancelApprovePage } from 'src/modals/order-cancel-approve/order-cancel-approve.page';
import { OrderSendSuccessPage } from 'src/modals/order-send-success/order-send-success.page';

const modals = [
  OrderCancelApprovePage,
  OrderSendSuccessPage,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  entryComponents: modals,
  declarations: modals,
})
export class ModalsModule { }
