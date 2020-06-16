import { Component, OnInit } from '@angular/core';
import { NativeService } from 'src/providers/NativeService';
import { BikerService } from 'src/services/biker.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-admin-contact',
  templateUrl: './order-admin-contact.page.html',
  styleUrls: ['./order-admin-contact.page.scss'],
})
export class OrderAdminContactPage implements OnInit {

  public order$ = Promise.resolve([]);
  public phoneNo: string;
  constructor(private nativeSvc: NativeService, private bikerSvc: BikerService, public alertController: AlertController) {
  }

  ngOnInit() {
    this.nativeSvc.SetPageTitle("ติดต่อศูนย์");
    this.loadData();
  }

  calling() {
    this.nativeSvc.PhoneCall(this.phoneNo);
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
    this.order$ = this.bikerSvc.getOrderInfo();
    this.order$.then((it: any) => {
      this.phoneNo = it.delivery.tel;
    }, async error => {
      alert.message = error.error.message;
      await alert.present();
    });
  }
}
