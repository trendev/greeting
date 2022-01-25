import { TestBed } from '@angular/core/testing';
import { EthService } from './eth.service';

describe('EthService', () => {
  let service: EthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthService);
  });

  const testGetter = (web3Fn: () => void, noWeb3Fn?: () => void) => {
    if (window.ethereum) {
      web3Fn();
    } else {
      expect(window.ethereum).toBeFalsy();
      if (noWeb3Fn) {
        noWeb3Fn();
      }
    }
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be initialized', () => {
    expect(service.isInitialized()).toBeFalsy();
  });

  it('should be disconnected', () => {
    expect(service.isConnected()).toBeFalsy();
  });

  describe('is initialized/connected', () => {

    it('and should get a valid Provider', (done: DoneFn) => {
      testGetter(
        () => {
          service.getProvider()
            .then(v => {
              expect(v).toBeTruthy();
              expect(service.isInitialized()).toBeTrue();
              expect(service.isConnected()).toBeTrue();
            })
            .finally(() => done());
        },
        () => {
          service.getProvider()
            .then(v => expect(v).toBeFalsy())
            .finally(() => {
              expect(service.isInitialized()).toBeTrue();
              expect(service.isConnected()).toBeFalse();
              done();
            });
        }
      );
    });

    it('and should get a valid Signer', (done: DoneFn) => {
      testGetter(
        () => {
          service.getSigner()
            .then(v => {
              expect(v).toBeTruthy();
              expect(service.isInitialized()).toBeTrue();
              expect(service.isConnected()).toBeTrue();
            })
            .finally(() => done());
        },
        () => {
          service.getSigner()
            .catch(err => {
              expect(err).toBeTruthy();
              expect(err).toBeInstanceOf(TypeError);
              if (err instanceof TypeError) {
                expect(err.message).toContain(`Cannot read properties of undefined`);
              }
            })
            .finally(() => {
              expect(service.isInitialized()).toBeTrue();
              expect(service.isConnected()).toBeFalse();
              done();
            });
        }
      );
    });

    it('and should get a valid BlockNumber', (done: DoneFn) => {
      testGetter(
        () => {
          service.getBlockNumber()
            .then(v => {
              expect(v).toBeTruthy();
              expect(v).toBeGreaterThanOrEqual(1); // even with a fresh Ganache setup, you may have more than 1 block...
              expect(service.isInitialized()).toBeTrue();
              expect(service.isConnected()).toBeTrue();
            })
            .finally(() => done());
        },
        () => {
          service.getBlockNumber()
            .catch(err => {
              expect(err).toBeTruthy();
              expect(err).toBeInstanceOf(TypeError);
              if (err instanceof TypeError) {
                expect(err.message).toContain(`Cannot read properties of undefined`);
              }
            })
            .finally(() => {
              expect(service.isInitialized()).toBeTrue();
              expect(service.isConnected()).toBeFalse();
              done();
            });
        }
      );
    });
  });

  it('and should get a valid Network', (done: DoneFn) => {
    testGetter(
      () => {
        service.getNetwork()
          .then(v => {
            expect(v).toBeTruthy();
            expect(v.chainId).toBeGreaterThanOrEqual(1);
            expect(v.name).toBeTruthy(); //unknown is truthy
            expect(service.isInitialized()).toBeTrue();
            expect(service.isConnected()).toBeTrue();
          })
          .finally(() => done());
      },
      () => {
        service.getNetwork()
          .catch(err => {
            expect(err).toBeTruthy();
            expect(err).toBeInstanceOf(TypeError);
            if (err instanceof TypeError) {
              expect(err.message).toContain(`Cannot read properties of undefined`);
            }
          })
          .finally(() => {
            expect(service.isInitialized()).toBeTrue();
            expect(service.isConnected()).toBeFalse();
            done();
          });
      }
    );
  });

  it('and should get a valid Balance', (done: DoneFn) => {
    testGetter(
      () => {
        service.getBalance()
          .then(v => {
            expect(v).toBeTruthy();
            expect(v._isBigNumber).toBeTrue();
            expect(service.isInitialized()).toBeTrue();
            expect(service.isConnected()).toBeTrue();
          })
          .finally(() => done());
      },
      () => {
        service.getBalance()
          .catch(err => {
            expect(err).toBeTruthy();
            expect(err).toBeInstanceOf(TypeError);
            if (err instanceof TypeError) {
              expect(err.message).toContain(`Cannot read properties of undefined`);
            }
          })
          .finally(() => {
            expect(service.isInitialized()).toBeTrue();
            expect(service.isConnected()).toBeFalse();
            done();
          });
      }
    );
  });

  it('and should get a valid Address', (done: DoneFn) => {
    testGetter(
      () => {
        service.getAddress()
          .then(v => {
            expect(v).toBeTruthy();
            expect(v).toContain('0x');
            expect(v.length).toBeLessThanOrEqual(42); //Ethereum address has a maximum length of 42 characters
            expect(service.isInitialized()).toBeTrue();
            expect(service.isConnected()).toBeTrue();
          })
          .finally(() => done());
      },
      () => {
        service.getAddress()
          .catch(err => {
            expect(err).toBeTruthy();
            expect(err).toBeInstanceOf(TypeError);
            if (err instanceof TypeError) {
              expect(err.message).toContain(`Cannot read properties of undefined`);
            }
          })
          .finally(() => {
            expect(service.isInitialized()).toBeTrue();
            expect(service.isConnected()).toBeFalse();
            done();
          });
      }
    );
  });
});
