import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BikerService } from 'src/services/biker.service';
import { NativeService } from 'src/providers/NativeService';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-cancel',
  templateUrl: './order-cancel.page.html',
  styleUrls: ['./order-cancel.page.scss'],
})
export class OrderCancelPage implements OnInit {

  public fg: FormGroup;
  private submitRequested: boolean;
  public cancel$ = Promise.resolve([]);
  public orderId: string
  constructor(private svc: NativeService, public alertController: AlertController, private fb: FormBuilder, private bikerSvc: BikerService, private nativeSvc: NativeService, public route: ActivatedRoute) {
    this.route.params.subscribe(param => { this.orderId = param["orderId"] });
    this.fg = this.fb.group({
      'heading': [null, Validators.required],
      'info': null,
    })
  }

  ngOnInit() {
    this.svc.SetPageTitle("ยกเลิกคำสั่งซื้อ");
  }

  async handleSubmit() {
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

    if (this.fg.valid)
      this.bikerSvc.createOrderCancelRequest(this.orderId, this.fg.value).then((it: any) => {
        this.nativeSvc.GoBack();
      }, async error => {
        alert.message = error.error.message;{}
        await alert.present();
      });
  }
}
