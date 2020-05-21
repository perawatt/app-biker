import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-stage',
  templateUrl: './order-stage.page.html',
  styleUrls: ['./order-stage.page.scss'],
})
export class OrderStagePage implements OnInit {

  public page: string;
  public isCancel: boolean;

  constructor() {
    this.page = "start";
    this.isCancel = false;

  }

  ngOnInit() {
  }

  onClick(footer: string) {
    if (footer == "start") {
      this.page = "center";
      console.log('1');
    }
    else if (footer == "center") {
      this.page = "end";
      console.log('2');
    }
    else if (footer == "end") {
      //open modal
      console.log('3');
    }
  }

  cancel() {
    this.isCancel = true;
  }

}
