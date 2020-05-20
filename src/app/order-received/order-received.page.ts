import { Component, OnInit } from '@angular/core';
import { NativeService } from '../../providers/navigateService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-received',
  templateUrl: './order-received.page.html',
  styleUrls: ['./order-received.page.scss'],
})
export class OrderReceivedPage implements OnInit {

  public header: string;
  constructor(private svc: NativeService, private route: ActivatedRoute) {
    this.route.params.subscribe(param => { this.header = param["id"] });
  }
  
  ngOnInit() {
    this.svc.SetPageTitle(this.header);
    console.log(this.header);
  }

}
