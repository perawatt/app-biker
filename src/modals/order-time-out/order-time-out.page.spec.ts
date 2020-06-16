import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderTimeOutPage } from './order-time-out.page';

describe('OrderTimeOutPage', () => {
  let component: OrderTimeOutPage;
  let fixture: ComponentFixture<OrderTimeOutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTimeOutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderTimeOutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
