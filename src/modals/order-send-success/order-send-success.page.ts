import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-send-success',
  templateUrl: './order-send-success.page.html',
  styleUrls: ['./order-send-success.page.scss'],
})
export class OrderSendSuccessPage implements OnInit {

  public doWork: boolean;
  public time: any;
  constructor(private modalController: ModalController, private route: ActivatedRoute) {
    this.route.params.subscribe(param => { this.time = param["time"] });
  }

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
