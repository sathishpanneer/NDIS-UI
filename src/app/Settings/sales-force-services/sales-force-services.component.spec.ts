import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesForceServicesComponent } from './sales-force-services.component';

describe('SalesForceServicesComponent', () => {
  let component: SalesForceServicesComponent;
  let fixture: ComponentFixture<SalesForceServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesForceServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesForceServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
