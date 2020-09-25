import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriaAddComponent } from './convocatoria-add.component';

describe('ConvocatoriaAddComponent', () => {
  let component: ConvocatoriaAddComponent;
  let fixture: ComponentFixture<ConvocatoriaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvocatoriaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
