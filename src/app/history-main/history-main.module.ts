import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryMainPageRoutingModule } from './history-main-routing.module';

import { HistoryMainPage } from './history-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryMainPageRoutingModule
  ],
  declarations: [HistoryMainPage]
})
export class HistoryMainPageModule {}
