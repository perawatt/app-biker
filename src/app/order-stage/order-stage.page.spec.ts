import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderStagePage } from './order-stage.page';

describe('OrderStagePage', () => {
  let component: OrderStagePage;
  let fixture: ComponentFixture<OrderStagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderStagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
