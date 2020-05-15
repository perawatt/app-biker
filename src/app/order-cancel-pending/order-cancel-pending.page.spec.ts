import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderCancelPendingPage } from './order-cancel-pending.page';

describe('OrderCancelPendingPage', () => {
  let component: OrderCancelPendingPage;
  let fixture: ComponentFixture<OrderCancelPendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCancelPendingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderCancelPendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
