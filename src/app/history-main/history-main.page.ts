import { NativeService } from 'src/providers/navigateService';
import { BikerService } from './../../services/biker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-main',
  templateUrl: './history-main.page.html',
  styleUrls: ['./history-main.page.scss'],
})
export class HistoryMainPage implements OnInit {
  orderHistory$ = Promise.resolve([]);
  constructor(private svc: NativeService, private bikerSvc: BikerService, private nativeSvc: NativeService) { }

  ngOnInit() {
    let date = new Date("2020-05-19");
    this.svc.SetPageTitle("งานย้อนหลัง");
    this.orderHistory$ = this.bikerSvc.getOrderHistories(date);
    this.orderHistory$.then((it: any) => {
      console.log("get: " + JSON.stringify(it));
    })
  }

  detailHistory(_id: string) {
    this.nativeSvc.NavigateToPage("history-detail", { id: _id });
  }

}
