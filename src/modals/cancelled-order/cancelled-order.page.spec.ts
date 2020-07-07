import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CancelledOrderPage } from './cancelled-order.page';

describe('CancelledOrderPage', () => {
  let component: CancelledOrderPage;
  let fixture: ComponentFixture<CancelledOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelledOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
