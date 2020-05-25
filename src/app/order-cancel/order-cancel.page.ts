import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BikerService } from 'src/services/biker.service';
import { NativeService } from 'src/providers/NativeService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-cancel',
  templateUrl: './order-cancel.page.html',
  styleUrls: ['./order-cancel.page.scss'],
})
export class OrderCancelPage implements OnInit {
  public fg: FormGroup;
  private submitRequested: boolean;
  cancel$ = Promise.resolve([]);
  public orderId: string

  constructor(private svc: NativeService, private fb: FormBuilder, private bikerSvc: BikerService, private nativeSvc: NativeService, public route: ActivatedRoute) {
    this.route.params.subscribe(param => { this.orderId = param["orderId"] });
    console.log('con',this.orderId);
    
    this.fg = this.fb.group({
      'heading': null,
      'info': null,
    })
  }

  ngOnInit() {
    this.svc.SetPageTitle("ยกเลิกคำสั่งซื้อ");
    console.log('nit',this.orderId);

  }

  handleSubmit() {
    console.log(this.orderId);
    console.log('heading', this.fg.get('heading').value);
    console.log('heading2', this.fg.get('info').value);
    if (this.fg.get('heading').value != null && this.fg.get('info').value != null)
      this.bikerSvc.createOrderCancelRequest(this.orderId, this.fg.value).then((it: any) => {
        this.nativeSvc.GoBack();
      })
  }

}
