import { Component, OnInit } from '@angular/core';
import { NativeService } from 'src/providers/NativeService';
import { BikerService } from 'src/services/biker.service';

@Component({
  selector: 'app-order-customer-contact',
  templateUrl: './order-customer-contact.page.html',
  styleUrls: ['./order-customer-contact.page.scss'],
})
export class OrderCustomerContactPage implements OnInit {

  public order$ = Promise.resolve([]);

  constructor(private nativeSvc: NativeService, private bikerSvc: BikerService) { }

  ionViewDidEnter() {
    this.getCustomerInfo();
  }

  ngOnInit() {
    this.nativeSvc.SetPageTitle("ติดต่อลูกค้า");
  }

  getCustomerInfo(){
    this.order$ = this.bikerSvc.getOrderInfo();
  }

}
