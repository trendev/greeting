import { TestBed } from '@angular/core/testing';

import { EthService } from './eth.service';

describe('EthService', () => {
  let service: EthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be disconnected', () => {
    expect(service.isConnected()).toBeFalsy();
  });

  it('should get an empty Provider', () => {
    expect(service.getProvider()).toBeFalsy();
  });

  it('should get an empty Signer', () => {
    expect(service.getSigner()).toBeFalsy();
  });

  it('should throw an error reading blocknumber', () => {
    expect(()=> service.getBlockNumber()).toThrowError(`Cannot read properties of undefined (reading 'getBlockNumber')`);
  });

  it('should throw an error reading network', () => {
    expect(()=> service.getNetwork()).toThrowError(`Cannot read properties of undefined (reading 'getNetwork')`);
  });

});
