import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestimoniosComponent } from './testimonios.component';

describe('TestimoniosComponent', () => {
  let component: TestimoniosComponent;
  let fixture: ComponentFixture<TestimoniosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimoniosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimoniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
