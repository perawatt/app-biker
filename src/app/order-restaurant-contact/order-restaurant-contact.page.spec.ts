import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderRestaurantContactPage } from './order-restaurant-contact.page';

describe('OrderRestaurantContactPage', () => {
  let component: OrderRestaurantContactPage;
  let fixture: ComponentFixture<OrderRestaurantContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRestaurantContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderRestaurantContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
