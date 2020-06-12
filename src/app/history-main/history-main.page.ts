import { NativeService } from 'src/providers/NativeService';
import { BikerService } from './../../services/biker.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-history-main',
  templateUrl: './history-main.page.html',
  styleUrls: ['./history-main.page.scss'],
})
export class HistoryMainPage implements OnInit {

  public date = new Date();
  public orderHistory$ = Promise.resolve([]);
  constructor(private alertCtr: AlertController, private bikerSvc: BikerService, private nativeSvc: NativeService) { }

  ionViewWillEnter() {
    this.getOrderHistories();
  }

  ngOnInit() {
    this.nativeSvc.SetPageTitle("งานย้อนหลัง");
    this.nativeSvc.RegisterRefreshOnGoBack(() => this.getOrderHistories());
  }

  async getOrderHistories() {
    const alert = await this.alertCtr.create({
      header: 'เกิดข้อผิดพลาด',
      message: "",
      buttons: [{
        text: 'ตกลง',
        handler: () => {
          this.getOrderHistories();
        },
      }],
      backdropDismiss: false
    });

    this.orderHistory$ = this.bikerSvc.getOrderHistories(this.date);
    this.orderHistory$.then((it: any) => {
      console.log(it);
    }, async error => {
      alert.message = error.error.message;

      await alert.present();
    })
  }

  detailHistory(_id: string) {
    this.nativeSvc.NavigateToPage("history-detail", { id: _id });
  }

}
