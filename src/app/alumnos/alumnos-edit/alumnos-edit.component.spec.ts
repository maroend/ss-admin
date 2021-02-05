import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlumnosEditComponent } from './alumnos-edit.component';

describe('AlumnosEditComponent', () => {
  let component: AlumnosEditComponent;
  let fixture: ComponentFixture<AlumnosEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
