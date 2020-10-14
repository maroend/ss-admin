import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriaEditComponent } from './convocatoria-edit.component';

describe('ConvocatoriaEditComponent', () => {
  let component: ConvocatoriaEditComponent;
  let fixture: ComponentFixture<ConvocatoriaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvocatoriaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
