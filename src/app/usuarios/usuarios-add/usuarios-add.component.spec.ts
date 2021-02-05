import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsuariosAddComponent } from './usuarios-add.component';

describe('UsuariosAddComponent', () => {
  let component: UsuariosAddComponent;
  let fixture: ComponentFixture<UsuariosAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
