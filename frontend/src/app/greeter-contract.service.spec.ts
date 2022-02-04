import { catchError, EMPTY, finalize, of, tap } from 'rxjs';
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

  it('should not be deployed', () => {
    expect(service.isDeployed()).toBeFalsy();
  });

  it('should return EMPTY observable if not deployed', () => {
    expect(service.isDeployed()).toBeFalsy();
    expect(service.logs()).toEqual(EMPTY);
  });
});
