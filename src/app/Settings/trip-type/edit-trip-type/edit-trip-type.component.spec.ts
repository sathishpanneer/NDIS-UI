import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTripTypeComponent } from './edit-trip-type.component';

describe('EditTripTypeComponent', () => {
  let component: EditTripTypeComponent;
  let fixture: ComponentFixture<EditTripTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTripTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTripTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
