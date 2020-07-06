import { Component, OnInit } from '@angular/core';
import { NativeService } from 'src/providers/NativeService';
import { BikerService } from 'src/services/biker.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-customer-contact',
  templateUrl: './order-customer-contact.page.html',
  styleUrls: ['./order-customer-contact.page.scss'],
})
export class OrderCustomerContactPage implements OnInit {

  public order$ = Promise.resolve([]);
  public phoneNo: string;
  constructor(private nativeSvc: NativeService, private bikerSvc: BikerService, public alertController: AlertController) {
  }

  ngOnInit() {
    this.nativeSvc.SetPageTitle("ติดต่อลูกค้า");
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
          this.nativeSvc.GoBack();
        },
      }],
      backdropDismiss: false
    });
    this.order$ = this.bikerSvc.getOrderInfo();
    this.order$.then((it: any) => {
      this.phoneNo = it.customer.phoneNumber;
    }, async error => {
      alert.message = error.error.message;
      await alert.present();
    });
  }
}
