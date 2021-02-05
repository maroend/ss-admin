import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlumnosverproyectoComponent } from './alumnos-verproyecto.component';

describe('AlumnosverproyectoComponent', () => {
  let component: AlumnosverproyectoComponent;
  let fixture: ComponentFixture<AlumnosverproyectoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosverproyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosverproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
