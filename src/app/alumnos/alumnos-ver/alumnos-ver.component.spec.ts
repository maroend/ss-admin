import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlumnosverComponent } from './alumnos-ver.component';

describe('AlumnosverComponent', () => {
  let component: AlumnosverComponent;
  let fixture: ComponentFixture<AlumnosverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
