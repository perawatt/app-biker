import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OrderSendSuccessPage } from '../order-send-success/order-send-success.page';
import { NativeService } from '../../providers/navigateService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public router: Router, private modalController: ModalController, private svc: NativeService) { }

  async zzz() {
    const modal = await this.modalController.create({
      component: OrderSendSuccessPage,
      cssClass: 'dialog-modal-4-order-success',
      backdropDismiss: false
    });
    modal.onDidDismiss().then(data => {
    })
    modal.present();
  }

  ngOnInit() {
  }

  receiveOrder() {
    this.svc.NavigateToPage("order-received", { id: "id001" });
  }

}
