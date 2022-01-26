import { catchError, finalize, of } from 'rxjs';
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

  it('should throw a TypeError if not deployed', () => {
    try {
      service.logs().subscribe();
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
      if (err instanceof TypeError) {
        expect(err.message).toContain(`Cannot read properties of undefined`);
      }
    }
  });
});
