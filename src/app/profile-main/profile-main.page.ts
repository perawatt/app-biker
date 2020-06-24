import { Component, OnInit } from '@angular/core';
import { BikerService } from 'src/services/biker.service';
import { NativeService } from 'src/providers/NativeService';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.page.html',
  styleUrls: ['./profile-main.page.scss'],
})
export class ProfileMainPage implements OnInit {

  public bikerInfo$ = Promise.resolve([]);
  constructor(private alertCtr: AlertController, private svc: NativeService, private bikerSvc: BikerService) {
  }

  ngOnInit() {
    this.loadData();
    this.svc.SetPageTitle("โปร์ไฟล์");
  }

  async loadData() {
    const alert = await this.alertCtr.create({
      header: 'เกิดข้อผิดพลาด',
      message: "",
      buttons: [{
        text: 'ตกลง',
        handler: () => {
          this.loadData;
        },
      }],
      backdropDismiss: false
    });
    this.bikerInfo$ = this.bikerSvc.getBikerInfo();
    this.bikerInfo$.then((it: any) => {
    }, async error => {
      alert.message = error.error.message;

      await alert.present();
    })
  }
}
