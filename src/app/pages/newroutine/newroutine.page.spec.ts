import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewroutinePage } from './newroutine.page';

describe('NewroutinePage', () => {
  let component: NewroutinePage;
  let fixture: ComponentFixture<NewroutinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewroutinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewroutinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
