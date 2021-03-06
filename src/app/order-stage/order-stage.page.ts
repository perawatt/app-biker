import { Component, OnInit } from '@angular/core';
import { NativeService } from 'src/providers/NativeService';
import { Router } from '@angular/router';
import { BikerService } from 'src/services/biker.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-stage',
  templateUrl: './order-stage.page.html',
  styleUrls: ['./order-stage.page.scss'],
})
export class OrderStagePage implements OnInit {

  public orderId: string;
  public orderInfo$ = Promise.resolve([]);
  public page: string;
  public isCancel: boolean;
  public time: any;
  public progressInterval;
  constructor(private router: Router, private nativeSvc: NativeService, private bikerSvc: BikerService, private alertCtr: AlertController) {
    this.page = "received";
    this.isCancel = false;
  }

  ionViewWillEnter() {
    this.progressInterval = setInterval(() => {
      this.time += 1000
    }, 1000);
    this.getOrderInfo();
    this.nativeSvc.RegisterRefreshOnGoBack(() => this.getOrderInfo());
  }

  ionViewWillLeave() {
    clearInterval(this.progressInterval);
  }

  ngOnInit() {
    this.nativeSvc.SetPageTitle("รับออเดอร์");
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

  async getOrderInfo() {
    const alert = await this.alertCtr.create({
      header: 'เกิดข้อผิดพลาด',
      message: "",
      buttons: [{
        text: 'ตกลง',
        handler: () => {
          this.getOrderInfo()
        },
      }],
      backdropDismiss: false
    });

    this.orderInfo$ = this.bikerSvc.getOrderInfo();
    this.orderInfo$.then((it: any) => {
      if (it == null || it == undefined) {
        this.nativeSvc.UpdateSidemenuItem("รับออเดอร์", "home");
        this.router.navigate(['/home']);
      }
      else {
        this.orderId = it._id
        this.isCancel = (it?.cancelRequestId != null && it?.cancelRequestId != "" && it?.cancelRequestId != undefined) ? true : false;

        if (it?.destinationDate) {
          this.page = "arrived";
          this.nativeSvc.SetPageTitle("คำสั่งซื้อ");

        } else if (it?.shippingDate) {
          this.page = "shipping";
          this.nativeSvc.SetPageTitle("คำสั่งซื้อ");

        } else {
          this.page = "received";
          this.nativeSvc.SetPageTitle("รับออเดอร์");
        }
        this.time = new Date().valueOf() - new Date(it.acceptRequestDate).valueOf();
      }
    }, async error => {
      alert.message = error.error.message;
      await alert.present();
    });
  }

  async changePage(footer: string) {
    const alert = await this.alertCtr.create({
      header: 'เกิดข้อผิดพลาด',
      message: "",
      buttons: [{
        text: 'ตกลง',
        handler: () => {
          this.getOrderInfo()
        },
      }],
      backdropDismiss: false
    });

    if (footer == "received") {
      this.bikerSvc.updateOrderStatusToShipping(this.orderId).then(it => {
        this.getOrderInfo()
      }, async error => {
        alert.message = error.error.message;
        await alert.present();
      });
    }
    else if (footer == "shipping") {
      this.bikerSvc.updateOrderStatusToArrived(this.orderId).then(it => {
        this.getOrderInfo()
      }, async error => {
        alert.message = error.error.message;
        await alert.present();
      });
    }
    else if (footer == "arrived") {
      this.bikerSvc.updateOrderStatusToSendSuccess(this.orderId).then(it => {
        this.nativeSvc.UpdateSidemenuItem("รับออเดอร์", "home");
        this.router.navigate(['/home', { openModal: "openModalOrderSendSuccess", orderId: this.orderId }]);
      }, async error => {
        alert.message = error.error.message;
        await alert.present();
      });
    }
  }

  public OpenMap(latitude: string, longitude: string) {
    this.nativeSvc.OpenMapDirection(parseFloat(latitude), parseFloat(longitude));
  }

  requestCancel() {
    this.nativeSvc.NavigateToPage("order-cancel", { orderId: this.orderId });
  }

  customerContact() {
    this.nativeSvc.NavigateToPage("order-customer-contact");
  }

  restaurantContact(){
    this.nativeSvc.NavigateToPage("order-restaurant-contact");
  }

  adminContact(){
    this.nativeSvc.NavigateToPage("order-admin-contact");
  }
}
