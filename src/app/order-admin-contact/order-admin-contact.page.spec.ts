import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderAdminContactPage } from './order-admin-contact.page';

describe('OrderAdminContactPage', () => {
  let component: OrderAdminContactPage;
  let fixture: ComponentFixture<OrderAdminContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAdminContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAdminContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
