import { NativeService } from 'src/providers/NativeService';
import { BikerService } from './../../services/biker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-main',
  templateUrl: './history-main.page.html',
  styleUrls: ['./history-main.page.scss'],
})
export class HistoryMainPage implements OnInit {

  public date = new Date();
  public orderHistory$ = Promise.resolve([]);
  constructor(private svc: NativeService, private bikerSvc: BikerService, private nativeSvc: NativeService) { }

  ionViewDidEnter() {
    this.getOrderHistories();
  }

  ngOnInit() {
    this.svc.SetPageTitle("งานย้อนหลัง");
    this.nativeSvc.RegisterRefreshOnGoBack(() => this.getOrderHistories());
  }

  getOrderHistories() {
    this.orderHistory$ = this.bikerSvc.getOrderHistories(this.date);
    this.orderHistory$.then((it: any) => {
      console.log(it);
    })
  }

  detailHistory(_id: string) {
    this.nativeSvc.NavigateToPage("history-detail", { id: _id });
  }

}
