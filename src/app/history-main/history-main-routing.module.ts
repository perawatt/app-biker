import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryMainPage } from './history-main.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryMainPageRoutingModule {}
