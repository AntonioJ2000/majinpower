import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditRutinePage } from './edit-rutine.page';

describe('EditRutinePage', () => {
  let component: EditRutinePage;
  let fixture: ComponentFixture<EditRutinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRutinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRutinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
