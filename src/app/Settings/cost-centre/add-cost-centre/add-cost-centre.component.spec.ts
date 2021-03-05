import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCostCentreComponent } from './add-cost-centre.component';

describe('AddCostCentreComponent', () => {
  let component: AddCostCentreComponent;
  let fixture: ComponentFixture<AddCostCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCostCentreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCostCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
