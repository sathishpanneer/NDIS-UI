import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletVehicleComponent } from './delet-vehicle.component';

describe('DeletVehicleComponent', () => {
  let component: DeletVehicleComponent;
  let fixture: ComponentFixture<DeletVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
