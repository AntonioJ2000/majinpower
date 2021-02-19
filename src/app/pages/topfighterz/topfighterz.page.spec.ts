import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopfighterzPage } from './topfighterz.page';

describe('TopfighterzPage', () => {
  let component: TopfighterzPage;
  let fixture: ComponentFixture<TopfighterzPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopfighterzPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopfighterzPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
