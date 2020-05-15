import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderReceivedPage } from './order-received.page';

describe('OrderReceivedPage', () => {
  let component: OrderReceivedPage;
  let fixture: ComponentFixture<OrderReceivedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderReceivedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderReceivedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
