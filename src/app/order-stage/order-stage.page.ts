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
  constructor(private router: Router, private nativeSvc: NativeService, private route: ActivatedRoute, private modalController: ModalController, private bikerSvc: BikerService) {
    this.page = "received";
    this.isCancel = false;
  }

  ionViewDidEnter() {
    this.getOrderInfo();
  }

  ngOnInit() {
    this.nativeSvc.SetPageTitle("รับออเดอร์");
    this.nativeSvc.RegisterRefreshOnGoBack(() => this.getOrderInfo());
    this.nativeSvc.RegisterNotificationHander("ApproveCancelOrder", (param) => this.openApproveCancelOrder());
  }

  openApproveCancelOrder() {
    this.nativeSvc.UpdateSidemenuItem("รับออเดอร์", "home");
    this.router.navigate(['/home', { openModal: "openModalCancelApprove" }]);
  }

  getOrderInfo() {
    this.orderInfo$ = this.bikerSvc.getOrderInfo();
    this.orderInfo$.then((it: any) => {
      console.log(it);

      this.orderId = it._id
      this.isCancel = (it?.cancelRequestId != null && it?.cancelRequestId != "" && it?.cancelRequestId != undefined) ? true : false;

      if (it?.destinationDate) {
        this.page = "arrived";
      } else if (it?.shippingDate) {
        this.page = "shipping";
      } else {
        this.page = "received";
      }

      // this.waitReplycancelRequest();
      this.acceptRequestDate = new Date(it.acceptRequestDate);
      this.shippingDate = new Date(it.shippingDate);
      this.destinationDate = new Date(it.destinationDate);

      // console.log('shippingDate', this.shippingDate.valueOf());
      // console.log('destinationDate', this.destinationDate.valueOf());

      if ((this.shippingDate.valueOf() == 0) && (this.destinationDate.valueOf() == 0)) {
        this.time = 0;
        console.log('0');

      }
      else if ((this.shippingDate.valueOf() != 0) && (this.destinationDate.valueOf() == 0)) {
        this.time = (this.shippingDate.valueOf() - this.acceptRequestDate.valueOf());
        console.log('1');
      }
      else {
        this.time = (this.destinationDate.valueOf() - this.acceptRequestDate.valueOf());
        console.log('2');
      }

      setInterval(() => {
        this.time += 1000
      }, 1000);
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
        this.router.navigate(['/home', { openModal: "openModalOrderSendSuccess" }]);
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

  //todo รอ Noti แจ้งอนุมัติคำขอยกเลิก
  waitReplycancelRequest() {
    if (this.isCancel) {
      setTimeout(() => {
        this.nativeSvc.NavigateToPage("home", { openModal: "openModalCancelApprove" });
      }, 5000);
    }
  }

  customerContact() {
    this.nativeSvc.NavigateToPage("order-customer-contact");
  }
}
