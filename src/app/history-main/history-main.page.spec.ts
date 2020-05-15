import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoryMainPage } from './history-main.page';

describe('HistoryMainPage', () => {
  let component: HistoryMainPage;
  let fixture: ComponentFixture<HistoryMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
