import { customNetworks } from './eth-net';
import { TestBed } from '@angular/core/testing';
import { EthService } from './eth.service';
import { BigNumber, providers, Wallet } from 'ethers';

describe('EthService', () => {
  let service: EthService;
  const netName = 'undefined ethereum network';

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

  it('should not be initialized at first call of isInitialized()', (done: DoneFn) => {
    testGetter(
      () => service.isInitialized().then(v => expect(v).toBeTrue())
        .finally(() => done()),
      () => service.isInitialized().then(v => expect(v).toBeFalse())
        .finally(() => done())
    );

  });

  it('should be initialized at second call of isInitialized()', (done: DoneFn) => {
    expect(service.isInitialized()).toBeDefined(); // force to initialize
    service.isInitialized().then(v => expect(v).toBeTrue())
      .finally(() => done());
  });

  it('should be disconnected', () => {
    expect(service.isConnected()).toBeFalsy();
  });


  it('should get a valid Provider', (done: DoneFn) => {
    testGetter(
      () => {
        service.getProvider()
          .then(v => {
            expect(v).toBeTruthy();
            expect(service.isConnected()).toBeTrue();
          })
          .finally(() => done());
      },
      () => {
        service.getProvider()
          .then(v => expect(v).toBeFalsy())
          .finally(() => {
            expect(service.isConnected()).toBeFalse();
            done();
          });
      }
    );
  });

  it('should get a valid Signer', (done: DoneFn) => {
    testGetter(
      () => {
        service.getSigner()
          .then(v => {
            expect(v).toBeTruthy();
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
            expect(service.isConnected()).toBeFalse();
            done();
          });
      }
    );
  });

  it('should get a valid BlockNumber', (done: DoneFn) => {
    testGetter(
      () => {
        service.getBlockNumber()
          .then(v => {
            expect(v).toBeTruthy();
            expect(v).toBeGreaterThanOrEqual(1); // even with a fresh Ganache setup, you may have more than 1 block...
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
            expect(service.isConnected()).toBeFalse();
            done();
          });
      }
    );
  });


  it('should get a valid Network', (done: DoneFn) => {
    testGetter(
      () => {
        service.getNetwork()
          .then(v => {
            expect(v).toBeTruthy();
            expect(v.chainId).toBeGreaterThanOrEqual(1);
            expect(v.name).toBeTruthy(); //unknown is truthy
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
            expect(service.isConnected()).toBeFalse();
            done();
          });
      }
    );
  });

  it('should get a valid Balance', (done: DoneFn) => {
    let signer = Wallet.createRandom();
    const value = 1000;
    signer.getBalance = (blockTag) => Promise.resolve(BigNumber.from(value))
    service.getSigner = () => Promise.resolve(signer);

    service.getBalance()
      .then(v => {
        expect(v).toBeTruthy();
        expect(v._isBigNumber).toBeTrue();
        expect(v.toNumber()).toEqual(value);
      })
      .finally(done);
  });

  it('should get a valid Address', (done: DoneFn) => {
    let signer = Wallet.createRandom();
    const address = '0x123456789abcdef0123456789';
    signer.getAddress = () => Promise.resolve(address)
    service.getSigner = () => Promise.resolve(signer);

    service.getAddress()
      .then(v => {
        expect(v).toBeTruthy();
        expect(v).toContain('0x');
        expect(v).toBe(address);
        expect(v.length).toBeLessThanOrEqual(42); //Ethereum address has a maximum length of 42 characters
      })
      .finally(done);
  });

  it('should get custom networks', () => {
    const networks = service.getCustomNetworks();
    expect(networks).toBeTruthy();
    expect(networks.length).toBeGreaterThanOrEqual(1);
  });

  it('should get custom networks names', () => {
    const networks = service.getCustomNetworksNames();
    expect(networks).toBeTruthy();
    expect(networks.length).toBeGreaterThanOrEqual(1);
    expect(networks.slice(1).every((e, i) => e.localeCompare(networks[i]))).toBeTrue();
  });

  it(`should add/switch network ${customNetworks[0].chainName}`, (done: DoneFn) => {
    service.getProvider = () => Promise.resolve(new providers.Web3Provider({
      isMetaMask: true,
      request: (r) => Promise.resolve(r)
    }, 'any'));

    service.addEthNetwork(customNetworks[0].chainName).then(r => expect(r).toBeDefined())
      .finally(done);
  });

  it(`should not add/switch network ${customNetworks[0].chainName} without valid provider or metamask`, (done: DoneFn) => {
    let provider: providers.Web3Provider;;
    service.getProvider = () => Promise.resolve(provider);

    service.addEthNetwork(customNetworks[0].chainName)
      .catch(err => {
        expect(err).toBeTruthy();
        expect(`${err}`).toContain('No Provider or Provider is not MetaMask')
        done();
      });
  });

  it(`should not add/switch network ${netName}`, (done: DoneFn) => {
    service.getProvider = () => Promise.resolve(new providers.Web3Provider({
      isMetaMask: true,
      request: (r) => Promise.resolve(r)
    }, 'any'));

    service.addEthNetwork(netName)
      .catch(err => {
        expect(err).toBeTruthy();
        expect(`${err}`).toContain('Unsupported Ethereum Network definition')
      })
      .finally(done);
  });

});
