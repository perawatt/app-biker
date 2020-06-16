import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-time-out',
  templateUrl: './order-time-out.page.html',
  styleUrls: ['./order-time-out.page.scss'],
})
export class OrderTimeOutPage implements OnInit {

  public doWork: boolean;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  working() {
    this.doWork = true;
    this.modalController.dismiss(this.doWork);
  }

  cancel() {
    this.modalController.dismiss();
  }


}
