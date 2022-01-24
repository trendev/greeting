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

  it('should not be initialized', () => {
    expect(service.isInitialized()).toBeFalsy();
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
    expect(() => service.getBlockNumber())
      .toThrowError(`Cannot read properties of undefined (reading 'getBlockNumber')`);
  });

  it('should throw an error reading network', () => {
    expect(() => service.getNetwork())
      .toThrowError(`Cannot read properties of undefined (reading 'getNetwork')`);
  });

  it('should init and be initialized', (done: DoneFn) => {
    service.init().then(() => expect(service.isInitialized()).toBeTrue())
      .finally(() => done());
  });

  describe('is initialized', () => {
    const testGetter = (expectation: () => void) => {
      if (window.ethereum) {
        expectation();
      } else {
        expect(window.ethereum).toBeFalsy();
      }
    };

    it('should be connected', (done: DoneFn) => {
      service.init().then(() => testGetter(() => expect(service.isConnected()).toBeTrue()))
        .finally(() => done());
    });

    it('should get an Ethereum Provider', (done: DoneFn) => {
      service.init().then(() => testGetter(() => expect(service.getProvider()).toBeTruthy()))
        .finally(() => done());
    });

    it('should get an Ethereum Signer', (done: DoneFn) => {
      service.init().then(() => testGetter(() => expect(service.getSigner()).toBeTruthy()))
        .finally(() => done());
    });

    it('should get the BlockNumber', (done: DoneFn) => {
      service.init().then(() => {
        testGetter(() => {
          expect(service.getBlockNumber()).toBeTruthy();
          service.getBlockNumber().then(block => expect(block).toBeGreaterThanOrEqual(0))
            .finally(() => done());
        });
      })
        .finally(() => done());
    });

    it('should get the Network', (done: DoneFn) => {
      service.init().then(() => {
        testGetter(() => {
          expect(service.getNetwork()).toBeTruthy();
          service.getNetwork().then(net => expect(net.chainId).not.toEqual(0))
            .finally(() => done());
        });
      })
        .finally(() => done());
    });

  });

});
