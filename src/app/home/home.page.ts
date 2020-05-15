import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OrderSendSuccessPage } from '../order-send-success/order-send-success.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router, private modalController: ModalController) {}

  xxx(){
    this.router.navigate(['/history-main']);
  }

  yyy(){
    this.router.navigate(['/history-detail']);
  }

  // zzz(){
  //   this.router.navigate(['/order-send-success']);
  // }

  async zzz() {
    const modal = await this.modalController.create({
      component: OrderSendSuccessPage,
      cssClass: 'dialog-modal-4-order-success',
      // backdropDismiss: false
    });
    modal.onDidDismiss().then(data => {
    })
    modal.present();
  }

}
