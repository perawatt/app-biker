import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { OrderSendSuccessPage } from '../../modals/order-send-success/order-send-success.page';
import { NativeService } from '../../providers/NativeService';
import { BikerService } from '../../services/biker.service';
import { OrderCancelApprovePage } from '../../modals/order-cancel-approve/order-cancel-approve.page';
import { OrderTimeOutPage } from 'src/modals/order-time-out/order-time-out.page';

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
  public IsSuspende: boolean;
  public orderId: string;
  public orderIdFinish: string;
  public acceptRequestDate: Date;
  public doneDate: Date;
  public time: any;
  public orderTimeOut: any;
  public processOrdertimeOut;
  constructor(public router: Router, public alertController: AlertController, private route: ActivatedRoute, private modalController: ModalController, private nativeSvc: NativeService, private bikerSvc: BikerService) {
  }

  ionViewWillEnter() {
    this.GetOrderDetail();
    this.nativeSvc.SetPageTitle('');
    this.loadData();
    this.nativeSvc.RegisterRefreshOnGoBack(() => this.GetOrderDetail());
  }

  ngOnInit() {
    this.nativeSvc.RegisterNotificationHander("SendOrder", (param) => this.GetOrderDetail());
    this.openModalOrder()
  }

  async loadData() {
    const alert = await this.alertController.create({
      header: 'เกิดข้อผิดพลาด',
      message: "",
      buttons: [{
        text: 'ตกลง',
        handler: () => {
          // this.navCtrl.back();
        },
      }],
      backdropDismiss: false
    });
    this.bikerInfo$ = this.bikerSvc.getBikerInfo();
    this.bikerInfo$.then((it: any) => {
      this.IsSuspende = it.suspended;
    }, async error => {
      alert.message = error.error.message;
      await alert.present();
    });
    this.getBikerStatusAndOrder();
  }

  async openModalOrder() {
    const alert = await this.alertController.create({
      header: 'เกิดข้อผิดพลาด',
      message: "",
      buttons: [{
        text: 'ตกลง',
        handler: () => {
          // this.navCtrl.back();
        },
      }],
      backdropDismiss: false
    });
    this.route.params.subscribe(param => { this.openModal = param["openModal"] });
    this.route.params.subscribe(param => { this.orderIdFinish = param["orderId"] });
    if (this.orderIdFinish) {
      this.bikerSvc.getOrderHistoryInfo(this.orderIdFinish).then(it => {
        this.acceptRequestDate = new Date(it.acceptRequestDate);
        this.doneDate = new Date(it.doneDate);
        this.time = (this.doneDate.valueOf() - this.acceptRequestDate.valueOf());
        this.openModals(this.openModal);
      }, async error => {
        alert.message = error.error.message;
        await alert.present();
      });
    } else {
      this.openModals(this.openModal);
    }
  }

  async GetOrderDetail() {
    const alert = await this.alertController.create({
      header: 'เกิดข้อผิดพลาด',
      message: "",
      buttons: [{
        text: 'ตกลง',
        handler: () => {
          // this.GetOrderDetail();
        },
      }],
      backdropDismiss: false
    });
    if (this.IsBikerOn) {
      this.order$ = this.bikerSvc.getNewOrderInfo();
      this.order$.then((it: any) => {
        console.log('xxx', it);
        if (it != null && it != undefined) {
          this.orderId = it?._id;
          let diff = new Date(it.cancelDate).valueOf() - new Date().valueOf();
          this.orderTimeOut = Math.round((diff % 60000) / 1000)
          this.setOrderTimeOut();
        }
        else {
          this.orderId = null;
        }
      }, async error => {
        alert.message = error.error.message;
        await alert.present();
      });
    }
  }

  async setOrderTimeOut() {
    const alert = await this.alertController.create({
      header: 'เกิดข้อผิดพลาด',
      message: "",
      buttons: [{
        text: 'ตกลง',
        handler: () => {
          this.loadData();
        },
      }],
      backdropDismiss: false
    });
    this.processOrdertimeOut = setInterval(() => {
      this.orderTimeOut--;
      if (this.orderTimeOut == 0) {
        clearInterval(this.processOrdertimeOut);
        this.bikerInfo$ = this.bikerSvc.updateBikerStatusOff();
        this.bikerInfo$.then((it: any) => {
          this.openModals("openModalOrderTimeOut");
        }, async error => {
          alert.message = error.error.message;
          await alert.present();
        })
      }
    }, 1000);
  }

  getBikerStatusAndOrder() {
    this.bikerInfo$.then((it: any) => {
      console.log(it);
      this.IsBikerOn = it?.onWorkStatus;
      if (this.IsBikerOn) this.GetOrderDetail();
    });
  }

  async toggleChange() {
    const alert = await this.alertController.create({
      header: 'เกิดข้อผิดพลาด',
      message: "",
      buttons: [{
        text: 'ตกลง',
        handler: () => {
          this.loadData();
        },
      }],
      backdropDismiss: false
    });
    this.bikerInfo$ = this.bikerSvc.getBikerInfo();
    this.bikerInfo$.then(async (it: any) => {
      this.IsSuspende = it.suspended;
      this.IsBikerOn = it?.onWorkStatus;
      if (this.IsBikerOn) this.GetOrderDetail();
      if (this.IsSuspende) {
        const alert = await this.alertController.create({
          message: "",
          buttons: [{
            text: 'ตกลง',
          }],
          backdropDismiss: false
        });
        alert.message = "คุณอยู่ในช่วงระหว่างถูกพักงาน";
        await alert.present();
      }
      else {
        this.IsBikerOn = !this.IsBikerOn
        if (this.IsBikerOn) {
          this.bikerInfo$ = this.bikerSvc.updateBikerStatusOn();
          this.bikerInfo$.then((it: any) => {
          }, async error => {
            alert.message = error.error.message;
            await alert.present();
          });
        }
        else {
          this.bikerInfo$ = this.bikerSvc.updateBikerStatusOff();
          this.bikerInfo$.then((it: any) => {
          }, async error => {
            alert.message = error.error.message;
            await alert.present();
          });
        };
      }
      this.getBikerStatusAndOrder();
    },
      async error => {
        alert.message = error.error.message;
        await alert.present();
      });
  }

  async openModals(text: string) {
    const alert = await this.alertController.create({
      header: 'เกิดข้อผิดพลาด',
      message: "",
      buttons: [{
        text: 'ตกลง',
        handler: () => {
          this.loadData();
        },
      }],
      backdropDismiss: false
    });
    if ((text != null) && (text != undefined) && (text == "openModalOrderSendSuccess")) {
      const modal = await this.modalController.create({
        component: OrderSendSuccessPage,
        cssClass: 'dialog-modal-4-order-success',
        componentProps: {
          'time': this.time,
        },
        backdropDismiss: false
      });
      modal.onDidDismiss().then(it => {
        this.IsBikerOn = it?.data
        if (this.IsBikerOn) {
          this.bikerInfo$ = this.bikerSvc.updateBikerStatusOn();
          this.bikerInfo$.then(() => { }, async error => {
            alert.message = error.error.message;
            await alert.present();
          });
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
        this.IsBikerOn = it?.data
        if (this.IsBikerOn) {
          this.bikerInfo$ = this.bikerSvc.updateBikerStatusOn();
          this.bikerInfo$.then(() => { }, async error => {
            alert.message = error.error.message;
            await alert.present();
          });
        }
        else {
          this.getBikerStatusAndOrder();
        }
      })
      modal.present();
    }
    else if ((text != null) && (text != undefined) && (text == "openModalOrderTimeOut")) {
      const modal = await this.modalController.create({
        component: OrderTimeOutPage,
        cssClass: 'dialog-modal-4-order-success',
        backdropDismiss: false
      });
      modal.onDidDismiss().then(it => {
        this.IsBikerOn = it?.data
        if (this.IsBikerOn) {
          this.bikerInfo$ = this.bikerSvc.updateBikerStatusOn();
          this.bikerInfo$.then((it) => {
            this.GetOrderDetail();
          }, async error => {
            alert.message = error.error.message;
            await alert.present();
          });
        }
        else {
          this.loadData();
        }
      })
      modal.present();
    }
  }

  async receiveOrder() {
    const alert = await this.alertController.create({
      header: 'เกิดข้อผิดพลาด',
      message: "",
      buttons: [{
        text: 'ตกลง',
        handler: () => {
          this.loadData();
        },
      }],
      backdropDismiss: false
    });
    clearInterval(this.processOrdertimeOut);
    this.bikerSvc.updateOrderStatusToReceived(this.orderId).then(it => {
      this.nativeSvc.UpdateSidemenuItem("รับออเดอร์", "order-stage");
      this.router.navigate(['/order-stage'])
    }, async error => {
      alert.message = error.error.message;
      await alert.present();
    }).catch(it => {
    });
  }
}
