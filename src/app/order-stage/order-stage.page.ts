import { Component, OnInit } from '@angular/core';
import { NativeService } from 'src/providers/NativeService';
import { ActivatedRoute, Router } from '@angular/router';
import { BikerService } from 'src/services/biker.service';
import { ModalController } from '@ionic/angular';
import { OrderSendSuccessPage } from '../../modals/order-send-success/order-send-success.page';
import { OrderCancelPage } from '../order-cancel/order-cancel.page';

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
  public acceptRequestDate: Date;
  public shippingDate: Date;
  public destinationDate: Date;
  public time: any;
  public progressInterval;
  constructor(private router: Router, private nativeSvc: NativeService, private route: ActivatedRoute, private modalController: ModalController, private bikerSvc: BikerService) {
    this.page = "received";
    this.isCancel = false;
  }

  ionViewDidEnter() {
    this.getOrderInfo();
  }

  ngOnInit() {
    this.progressInterval = setInterval(() => {
      this.time += 1000
    }, 1000);
    this.nativeSvc.SetPageTitle("รับออเดอร์");
    this.nativeSvc.RegisterRefreshOnGoBack(() => this.getOrderInfo());
    this.nativeSvc.RegisterNotificationHander("UpdateOrderStatus", (param) => this.notificationhandler(param));
  }

  notificationhandler(notiParam: any) {
    switch (notiParam.Status) {
      case "CancelConfirm": this.openApproveCancelOrder("openModalCancelApprove"); break;
      case "CancelDeny": this.getOrderInfo(); break;
      default: break;
    }
  }

  openApproveCancelOrder(modal: string) {
    this.nativeSvc.UpdateSidemenuItem("รับออเดอร์", "home");
    this.router.navigate(['/home', { openModal: modal }]);
  }

  getOrderInfo() {
    this.orderInfo$ = this.bikerSvc.getOrderInfo();
    this.orderInfo$.then((it: any) => {
      if (it == null || it == undefined) {
        this.nativeSvc.UpdateSidemenuItem("รับออเดอร์", "home");
        this.router.navigate(['/home']);
      }
      else{
        this.orderId = it._id
        this.isCancel = (it?.cancelRequestId != null && it?.cancelRequestId != "" && it?.cancelRequestId != undefined) ? true : false;
  
        if (it?.destinationDate) {
          this.page = "arrived";
        } else if (it?.shippingDate) {
          this.page = "shipping";
        } else {
          this.page = "received";
        }
  
        this.acceptRequestDate = new Date(it.acceptRequestDate);
        this.shippingDate = new Date(it.shippingDate);
        this.destinationDate = new Date(it.destinationDate);
  
        this.time = new Date().valueOf() - new Date(this.acceptRequestDate).valueOf();
      }

    })
  }

  changePage(footer: string) {
    if (footer == "received") {
      this.bikerSvc.updateOrderStatusToShipping(this.orderId).then(it => {
        this.nativeSvc.SetPageTitle("คำสั่งซื้อ");
        this.getOrderInfo()
      });
    }
    else if (footer == "shipping") {
      this.bikerSvc.updateOrderStatusToArrived(this.orderId).then(it => {
        this.nativeSvc.SetPageTitle("คำสั่งซื้อ");
        this.getOrderInfo()
      });
    }
    else if (footer == "arrived") {
      this.bikerSvc.updateOrderStatusToSendSuccess(this.orderId).then(it => {
        this.nativeSvc.UpdateSidemenuItem("รับออเดอร์", "home");
        this.router.navigate(['/home', { openModal: "openModalOrderSendSuccess", orderId: this.orderId }]);
      })
    }
  }

  public OpenMap(coordinates: string) {
    var splitted = coordinates.split(',', 2);
    console.log(parseFloat(splitted[0]), parseFloat(splitted[1]));
    this.nativeSvc.OpenMapDirection(parseFloat(splitted[0]), parseFloat(splitted[1]));
  }

  requestCancel() {
    this.nativeSvc.NavigateToPage("order-cancel", { orderId: this.orderId });
  }

  customerContact() {
    this.nativeSvc.NavigateToPage("order-customer-contact");
  }
}
