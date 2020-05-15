import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderCustomerContactPage } from './order-customer-contact.page';

describe('OrderCustomerContactPage', () => {
  let component: OrderCustomerContactPage;
  let fixture: ComponentFixture<OrderCustomerContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCustomerContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderCustomerContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
