import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingLineComponent } from './billing-line.component';

describe('BillingLineComponent', () => {
  let component: BillingLineComponent;
  let fixture: ComponentFixture<BillingLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
