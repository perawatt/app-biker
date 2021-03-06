import { BikerService } from './../../services/biker.service';
import { Component, OnInit } from '@angular/core';
import { NativeService } from 'src/providers/NativeService';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
})
export class HistoryDetailPage implements OnInit {

  public _id: string;
  public distanceMeters: Number = 0;
  public orderInfo$ = Promise.resolve([]);
  constructor(private alertCtr: AlertController, private svc: NativeService, private route: ActivatedRoute, private bikerSvc: BikerService) {
    this.route.params.subscribe(param => { this._id = param["id"] });
  }

  ngOnInit() {
    this.svc.SetPageTitle("รายละเอียดงาน");
  }

  ionViewWillEnter() {
    this.loadData();
  }

  async loadData() {
    const alert = await this.alertCtr.create({
      header: 'เกิดข้อผิดพลาด',
      message: "",
      buttons: [{
        text: 'ตกลง',
        handler: () => {
          this.svc.GoBack();
        },
      }],
      backdropDismiss: false
    });
    this.orderInfo$ = this.bikerSvc.getOrderHistoryInfo(this._id);
    this.orderInfo$.then((it: any) => {
      this.distanceMeters = it.distanceMeters / 1000;      
    }, async error => {
      alert.message = error.error.message;
      await alert.present();
    });
  }

}
