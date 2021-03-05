import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalErrorHandlingComponent } from './global-error-handling.component';

describe('GlobalErrorHandlingComponent', () => {
  let component: GlobalErrorHandlingComponent;
  let fixture: ComponentFixture<GlobalErrorHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalErrorHandlingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalErrorHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
