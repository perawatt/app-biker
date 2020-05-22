import { BikerService } from './../../services/biker.service';
import { Component, OnInit } from '@angular/core';
import { NativeService } from 'src/providers/navigateService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
})
export class HistoryDetailPage implements OnInit {
  _id: string;
  orderInfo$ = Promise.resolve([]);
  orderId = "637254783895100250";
  constructor(private svc: NativeService, private route: ActivatedRoute, private bikerSvc: BikerService) {
    this.route.params.subscribe(param => { this._id = param["id"] });
  }
  
  ngOnInit() {
    console.log(this._id);
    this.svc.SetPageTitle("รายละเอียดงาน");
    this.orderInfo$ = this.bikerSvc.getOrderHistoryInfo(this.orderId);
  }

}
