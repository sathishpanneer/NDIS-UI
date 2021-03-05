import { TestBed } from '@angular/core/testing';

import { BillingLineService } from './billing-line.service';

describe('BillingLineService', () => {
  let service: BillingLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
