import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsuariosiaEditComponent } from './usuarios-edit.component';

describe('ConvocatoriaEditComponent', () => {
  let component: UsuariosiaEditComponent;
  let fixture: ComponentFixture<UsuariosiaEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosiaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosiaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
