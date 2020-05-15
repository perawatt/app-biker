import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderShippingPage } from './order-shipping.page';

describe('OrderShippingPage', () => {
  let component: OrderShippingPage;
  let fixture: ComponentFixture<OrderShippingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderShippingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderShippingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
