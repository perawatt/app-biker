import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OrderSendSuccessPage } from '../order-send-success/order-send-success.page';
import { NativeService } from '../../providers/navigateService';
import { BikerService } from '../../services/biker.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  bikerInfo$ = Promise.resolve([]);
  data$ = Promise.resolve([]);
  IsBikerOn: boolean;
  constructor(public router: Router, private modalController: ModalController, private nativeSvc: NativeService, private bikerSvc: BikerService) { }

  // async zzz() {
  //   const modal = await this.modalController.create({
  //     component: OrderSendSuccessPage,
  //     cssClass: 'dialog-modal-4-order-success',
  //     backdropDismiss: false
  //   });
  //   modal.onDidDismiss().then(data => {
  //   })
  //   modal.present();
  // }
  ngOnInit() {
    this.getBikerInfo();
  }

  receiveOrder() {
    this.nativeSvc.NavigateToPage("order-received", { id: "id001" });
  }

  getBikerInfo() {
    this.bikerInfo$ = this.bikerSvc.getBikerInfo();
    this.bikerInfo$.then((it: any) => {
      this.IsBikerOn = it?.onWorkStatus;
      console.log("get: " + this.IsBikerOn);
    })
  }

  toggleChange() {
    console.log("toggle: " + this.IsBikerOn);
    let bikerStatus$ = Promise.resolve([]);
    if (this.IsBikerOn) {
      bikerStatus$ = this.bikerSvc.updateBikerStatusOn();
    }
    else {
      bikerStatus$ = this.bikerSvc.updateBikerStatusOff();
    };
      bikerStatus$.then((it: any) => {
      console.log("response:" + it.onWorkStatus);
      this.IsBikerOn = it?.onWorkStatus;
    })
  }
}
