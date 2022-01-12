import { TestBed } from '@angular/core/testing';

import { GreeterContractService } from './greeter-contract.service';

describe('GreeterContractService', () => {
  let service: GreeterContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreeterContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
