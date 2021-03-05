import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCostCentreComponent } from './update-cost-centre.component';

describe('UpdateCostCentreComponent', () => {
  let component: UpdateCostCentreComponent;
  let fixture: ComponentFixture<UpdateCostCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCostCentreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCostCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
