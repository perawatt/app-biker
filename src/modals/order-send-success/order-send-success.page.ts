import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-send-success',
  templateUrl: './order-send-success.page.html',
  styleUrls: ['./order-send-success.page.scss'],
})
export class OrderSendSuccessPage implements OnInit {
  
  @Input() time: string;
  public doWork: boolean;
  constructor(private modalController: ModalController) {
    console.log(this.time);
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
