import { NativeService } from 'src/providers/NativeService';
import { BikerService } from './../../services/biker.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-history-main',
  templateUrl: './history-main.page.html',
  styleUrls: ['./history-main.page.scss'],
})
export class HistoryMainPage implements OnInit {

  @ViewChild('datePicker') datePicker;
  public date = Date.now();
  public maxDate: string;
  public orderCount: Number = 0;
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
          // this.getOrderHistories();
        },
      }],
      backdropDismiss: false
    });

    this.maxDate = new Date(Date.now()).toISOString().substring(0, 10);
    let doneDate = this.date ? new Date(this.date) : new Date(Date.now());
    doneDate.setHours(7);

    this.orderHistory$ = this.bikerSvc.getOrderHistories(doneDate);
    this.orderHistory$.then(it => {
      this.orderCount = it.length;
      if (it.length > 0) {
        console.log(it.length);
        it.sort((a, b) => new Date(b.acceptRequestDate).getTime() - new Date(a.acceptRequestDate).getTime());
      }
    }, async error => {
      alert.message = error.error.message;
      await alert.present();
    })
  }

  detailHistory(_id: string) {
    this.nativeSvc.NavigateToPage("history-detail", { id: _id });
  }

}
