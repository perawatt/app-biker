import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileMainPageRoutingModule } from './profile-main-routing.module';

import { ProfileMainPage } from './profile-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileMainPageRoutingModule
  ],
  declarations: [ProfileMainPage]
})
export class ProfileMainPageModule {}
