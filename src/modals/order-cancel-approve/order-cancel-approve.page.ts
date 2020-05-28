import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-cancel-approve',
  templateUrl: './order-cancel-approve.page.html',
  styleUrls: ['./order-cancel-approve.page.scss'],
})
export class OrderCancelApprovePage implements OnInit {

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
