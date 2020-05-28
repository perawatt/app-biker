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

  public openModal: string;
  public bikerInfo$ = Promise.resolve([]);
  public order$ = Promise.resolve([]);
  public IsBikerOn: boolean;
  public orderId: string;
  constructor(public router: Router, private route: ActivatedRoute, private modalController: ModalController, private nativeSvc: NativeService, private bikerSvc: BikerService) {
  }

  ionViewDidEnter() {
    this.GetOrderDetail();
    this.nativeSvc.SetPageTitle('');
  }

  ngOnInit() {
    console.log(this.IsBikerOn);

    this.bikerInfo$ = this.bikerSvc.getBikerInfo();
    this.getBikerStatusAndOrder();

    this.route.params.subscribe(param => { this.openModal = param["openModal"] });
    console.log(this.openModal);
    this.openModalOrderSendSuccess(this.openModal);

    this.nativeSvc.RegisterNotificationHander("SendOrder", (param) => this.GetOrderDetail());
    this.nativeSvc.RegisterRefreshOnGoBack(()=>this.GetOrderDetail());
  }

  GetOrderDetail() {
    if (this.IsBikerOn) {
      this.order$ = this.bikerSvc.getNewOrderInfo();
      this.order$.then((it: any) => {
        console.log("order: " + JSON.stringify(it));
        this.orderId = it?._id;
      });
    }
  }

  getBikerStatusAndOrder() {
    this.bikerInfo$.then((it: any) => {
      console.log(it);
      this.IsBikerOn = it?.onWorkStatus;
      if(this.IsBikerOn) this.GetOrderDetail();
      console.log("get: " + this.IsBikerOn);
    })
  }

  toggleChange() {
    console.log("toggle: " + this.IsBikerOn);
    this.IsBikerOn = !this.IsBikerOn
    if (this.IsBikerOn) {
      this.bikerInfo$ = this.bikerSvc.updateBikerStatusOn();
    }
    else {
      this.bikerInfo$ = this.bikerSvc.updateBikerStatusOff();
    };
    this.getBikerStatusAndOrder();
  }

  async openModalOrderSendSuccess(text: string) {
    if ((text != null) && (text != undefined) && (text == "openModalOrderSendSuccess")) {
      const modal = await this.modalController.create({
        component: OrderSendSuccessPage,
        cssClass: 'dialog-modal-4-order-success',
        backdropDismiss: false
      });
      modal.onDidDismiss().then(it => {
        console.log(it);
        this.IsBikerOn = it?.data
        console.log("IsBikerOn: ", this.IsBikerOn);
        if (this.IsBikerOn) {
          this.bikerInfo$ = this.bikerSvc.updateBikerStatusOn();
        }
        else {
          this.getBikerStatusAndOrder();
        }
      })
      modal.present();
    }
    else if ((text != null) && (text != undefined) && (text == "openModalCancelApprove")) {
      const modal = await this.modalController.create({
        component: OrderCancelApprovePage,
        cssClass: 'dialog-modal-4-order-success',
        backdropDismiss: false
      });
      modal.onDidDismiss().then(it => {
        console.log(it);
        this.IsBikerOn = it?.data
        console.log("IsBikerOn: ", this.IsBikerOn);
        if (this.IsBikerOn) {
          this.bikerInfo$ = this.bikerSvc.updateBikerStatusOn();
        }
        else {
          this.getBikerStatusAndOrder();
        }
      })
      modal.present();
    }
  }

  receiveOrder() {
    this.bikerSvc.updateOrderStatusToReceived(this.orderId).then(it => {
      this.nativeSvc.UpdateSidemenuItem("รับออเดอร์","order-stage");
      this.router.navigate(['/order-stage'])
    }).catch(it=>{
      console.log(JSON.stringify(it));
    });
  }
}
