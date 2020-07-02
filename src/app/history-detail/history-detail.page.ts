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
  public orderInfo$ = Promise.resolve([]);
  public acceptRequestDate: Date;
  public doneDate: Date;
  public time: any;
  constructor(private alertCtr: AlertController, private svc: NativeService, private route: ActivatedRoute, private bikerSvc: BikerService) {
    this.route.params.subscribe(param => { this._id = param["id"] });
  }

  ngOnInit() {
    this.svc.SetPageTitle("รายละเอียดงาน");
  }
  
  ionViewWillEnter(){
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
      this.acceptRequestDate = new Date(it.acceptRequestDate);
      this.doneDate = new Date(it.doneDate);
      this.time = (this.doneDate.valueOf() - this.acceptRequestDate.valueOf());
    }, async error => {
      alert.message = error.error.message;
      await alert.present();
    });
  }

}
