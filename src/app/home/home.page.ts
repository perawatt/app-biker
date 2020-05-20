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

  //MOCK ORDER ID
  orderId = "637255589336844832";

  bikerInfo$ = Promise.resolve([]);
  order$ = Promise.resolve([]);
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
    this.bikerInfo$ = this.bikerSvc.getBikerInfo();
    this.getBikerStatusAndOrder();
  }

  getBikerStatusAndOrder() {
    this.bikerInfo$.then((it: any) => {
      this.IsBikerOn = it?.onWorkStatus;
      console.log("get: " + this.IsBikerOn);

      if (this.IsBikerOn) {
        this.order$ = this.bikerSvc.getNewOrderInfo(this.orderId);
        this.order$.then((it: any) => {
          console.log("order: " + JSON.stringify(it));
        })
      }
    })
  }

  receiveOrder() {
    this.nativeSvc.NavigateToPage("order-received", { id: "id001" });
  }

  toggleChange() {
    console.log("toggle: " + this.IsBikerOn);

    if (this.IsBikerOn) {
      this.bikerInfo$ = this.bikerSvc.updateBikerStatusOn();
    }
    else {
      this.bikerInfo$ = this.bikerSvc.updateBikerStatusOff();
    };
    this.getBikerStatusAndOrder();
  }
}
