import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderArrivedPage } from './order-arrived.page';

describe('OrderArrivedPage', () => {
  let component: OrderArrivedPage;
  let fixture: ComponentFixture<OrderArrivedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderArrivedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderArrivedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
