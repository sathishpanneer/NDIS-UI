import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTripTypeComponent } from './delete-trip-type.component';

describe('DeleteTripTypeComponent', () => {
  let component: DeleteTripTypeComponent;
  let fixture: ComponentFixture<DeleteTripTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTripTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTripTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
