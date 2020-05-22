import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OrderSendSuccessPage } from '../order-send-success/order-send-success.page';
import { NativeService } from '../../providers/NativeService';
import { BikerService } from '../../services/biker.service';
import { stringify } from 'querystring';
import { OrderCancelApprovePage } from '../order-cancel-approve/order-cancel-approve.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //MOCK ORDER ID
  orderId = "637256612560183609";
  testx: string;
  bikerInfo$ = Promise.resolve([]);
  order$ = Promise.resolve([]);
  IsBikerOn: boolean;
  constructor(public router: Router, private route: ActivatedRoute, private modalController: ModalController, private nativeSvc: NativeService, private bikerSvc: BikerService) {
  }

  async zzz() {
    const modal = await this.modalController.create({
      component: OrderSendSuccessPage,
      // component: OrderCancelApprovePage,
      cssClass: 'dialog-modal-4-order-success',
      backdropDismiss: false
    });
    modal.onDidDismiss().then(data => {
    })
    modal.present();
  }

  ngOnInit() {
    this.bikerInfo$ = this.bikerSvc.getBikerInfo();
    this.getBikerStatusAndOrder();

    this.route.params.subscribe(param => { this.testx = param["test"] });
    console.log(this.testx);
    this.openModal(this.testx);
  }

  async openModal(xx: string) {
    console.log('xxxxxxx', xx);
    if ((xx != null) && (xx != undefined)) {
      console.log('555555555555');
      const modal = await this.modalController.create({
        component: OrderSendSuccessPage,
        cssClass: 'dialog-modal-4-order-success',
        backdropDismiss: false
      });
      modal.onDidDismiss().then(it => {
        console.log(it);
        this.IsBikerOn = it?.data
        console.log("IsBikerOn: " ,this.IsBikerOn);
        this.toggleChange()
      })
      modal.present();
    }
  }

  getBikerStatusAndOrder() {
    this.bikerInfo$.then((it: any) => {
      console.log(it);

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
    this.bikerSvc.updateOrderStatusToReceived(this.orderId).then(it => {
      this.nativeSvc.NavigateToPage("order-stage", { id: "id001" });
    })
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
