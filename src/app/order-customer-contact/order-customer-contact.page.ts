import { Component, OnInit } from '@angular/core';
import { NativeService } from 'src/providers/NativeService';

@Component({
  selector: 'app-order-customer-contact',
  templateUrl: './order-customer-contact.page.html',
  styleUrls: ['./order-customer-contact.page.scss'],
})
export class OrderCustomerContactPage implements OnInit {

  constructor(private nativeSvc: NativeService) { }

  ngOnInit() {
    this.nativeSvc.SetPageTitle("ติดต่อลูกค้า");
  }

}
