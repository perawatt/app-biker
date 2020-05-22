import { Component, OnInit } from '@angular/core';
import { NativeService } from 'src/providers/navigateService';
import { ActivatedRoute } from '@angular/router';
import { BikerService } from 'src/services/biker.service';
import { ModalController } from '@ionic/angular';
import { OrderSendSuccessPage } from '../order-send-success/order-send-success.page';
import { OrderCancelApprovePage } from '../order-cancel-approve/order-cancel-approve.page';

@Component({
  selector: 'app-order-stage',
  templateUrl: './order-stage.page.html',
  styleUrls: ['./order-stage.page.scss'],
})
export class OrderStagePage implements OnInit {

  public header: any;
  public orderId: string;
  public orderInfo$ = Promise.resolve([]);

  public page: string;
  public isCancel: boolean;

  constructor(private nativeSvc: NativeService, private route: ActivatedRoute, private modalController: ModalController, private bikerSvc: BikerService) {
    // this.route.params.subscribe(param => { this.header = param["id"] });
    this.page = "received";
    this.isCancel = false;
  }

  ngOnInit() {
    this.nativeSvc.SetPageTitle("รับออเดอร์");
    // console.log(this.header);
    this.getOrderInfo();
  }

  getOrderInfo() {
    this.orderInfo$ = this.bikerSvc.getOrderInfo();
    this.orderInfo$.then((it: any) => {
      this.orderId = it._id
      console.log(it);
      console.log(this.orderId);
    })
  }

  changePage(footer: string) {
    if (footer == "received") {
      this.bikerSvc.updateOrderStatusToShipping(this.orderId).then(it => {
        console.log(it);
        this.nativeSvc.SetPageTitle("คำสั่งซื้อ");
        this.getOrderInfo()
        this.page = "shipping";
        console.log('1');
      });
    }
    else if (footer == "shipping") {
      this.bikerSvc.updateOrderStatusToArrived(this.orderId).then(it => {
        console.log(it);
        this.nativeSvc.SetPageTitle("คำสั่งซื้อ");
        this.getOrderInfo()
        this.page = "arrived";
        console.log('2');
      });
    }
    else if (footer == "arrived") {
      this.bikerSvc.updateOrderStatusToSendSuccess(this.orderId).then(it => {
        console.log(it);
        this.nativeSvc.NavigateToPage("home", { test: "openModal" });
        console.log('3');
      })
    }
  }

  async openModalCancel() {
    this.isCancel = true;
    const modal = await this.modalController.create({
      component: OrderCancelApprovePage,
      cssClass: 'dialog-modal-4-order-success',
      backdropDismiss: false
    });
    modal.onDidDismiss().then(data => {
    })
    modal.present();
  }

}
