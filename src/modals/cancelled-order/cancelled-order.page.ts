import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cancelled-order',
  templateUrl: './cancelled-order.page.html',
  styleUrls: ['./cancelled-order.page.scss'],
})
export class CancelledOrderPage implements OnInit {

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
