import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlumnosAddComponent } from './alumnos-add.component';

describe('AlumnosAddComponent', () => {
  let component: AlumnosAddComponent;
  let fixture: ComponentFixture<AlumnosAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
