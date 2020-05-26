import { Component, OnInit } from '@angular/core';
import { BikerService } from 'src/services/biker.service';
import { NativeService } from 'src/providers/NativeService';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.page.html',
  styleUrls: ['./profile-main.page.scss'],
})
export class ProfileMainPage implements OnInit {

  public bikerInfo$ = Promise.resolve([]);
  constructor(private svc: NativeService, private bikerSvc: BikerService) { 
  }

  ngOnInit() {
    this.svc.SetPageTitle("โปร์ไฟล์");
    this.bikerInfo$ = this.bikerSvc.getBikerInfo();
    this.bikerInfo$.then((it: any) => {
      console.log("order: " + JSON.stringify(it));
    })
  }
}
