import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderStagePage } from './order-stage.page';

const routes: Routes = [
  {
    path: '',
    component: OrderStagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderStagePageRoutingModule {}
