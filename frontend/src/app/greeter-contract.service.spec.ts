import { EthService } from './eth.service';
import { EMPTY } from 'rxjs';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { GreeterContractService } from './greeter-contract.service';
import { ethers } from 'ethers';

describe('GreeterContractService', () => {
  let service: GreeterContractService;

  describe('is not initialized and the smart contract is not deployed', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(GreeterContractService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should not be deployed', () => {
      expect(service.isDeployed()).toBeFalsy();
      expect(service.contract).toBeFalsy();
    });

    it('should have a falsy contract', () => {
      expect(service.contract).toBeFalsy();
    });

    it('should return falsy greet', () => {
      expect(service.greet()).toBeFalsy();
    })

    it('should return falsy address', () => {
      expect(service.getAddress()).toBeFalsy();
    })

    it('should return an existing Subject for greeting updates', () => {
      expect(service.greetingUpdates()).toBeTruthy();
    })

    it('should return EMPTY observable for logs', () => {
      expect(service.isDeployed()).toBeFalsy();
      expect(service.logs()).toEqual(EMPTY);
    });

    it('should return EMPTY observable for owner', () => {
      expect(service.isDeployed()).toBeFalsy();
      expect(service.isOwner()).toEqual(EMPTY);
    });

    it('should return EMPTY observable for greeting update', () => {
      expect(service.isDeployed()).toBeFalsy();
      expect(service.setGreeting('message')).toEqual(EMPTY);
    });

    it('should throw an Exception', (done: DoneFn) => {
      service.init()
        .catch(err => {
          expect(err).toBeTruthy();
          if (err instanceof TypeError) {
            expect(err.message.includes('getSigner') || err.message.includes('getNetwork')).toBeTrue();
          }
        })
        .finally(done);
    });
  });

  describe('is using a stub EthService using a real Provider/Signer', () => {
    // avalanche fuji testnet
    const url = 'https://api.avax-test.network/ext/bc/C/rpc';
    const net = {
      name: "fuji",
      chainId: 43113
    };

    let ethServiceSpy: jasmine.SpyObj<EthService>;
    let wallet = ethers.Wallet.createRandom(); //Wallet is a Signer, let's create a random one
    let provider;

    beforeEach(waitForAsync(() => {
      provider = ethers.getDefaultProvider(url);
      wallet = wallet.connect(provider);
    }));

    beforeEach(() => {
      ethServiceSpy = jasmine.createSpyObj<EthService>('EthService', ['getNetwork', 'getSigner', 'getAddress']);

      ethServiceSpy.getNetwork.and.resolveTo(net);
      ethServiceSpy.getSigner.and.resolveTo(wallet);
      ethServiceSpy.getAddress.and.returnValue(wallet.getAddress());

      TestBed.configureTestingModule({
        providers: [{
          provide: EthService,
          useValue: ethServiceSpy
        }]
      });
      service = TestBed.inject(GreeterContractService);
    });

    it('should setup a Wallet', (done: DoneFn) => {
      let w = ethers.Wallet.createRandom();
      expect(w).toBeTruthy();
      expect(w.address).toContain('0x');
      expect(w.publicKey).toBeTruthy();
      expect(w.privateKey).toBeTruthy();
      expect(w.mnemonic).toBeTruthy();
      expect(w.mnemonic.phrase).toBeTruthy();
      expect(w.mnemonic.phrase.split(' ').length).toEqual(12);

      const p = ethers.getDefaultProvider(url);
      expect(p).toBeTruthy();
      p.getNetwork().then(n => expect(n.chainId).toEqual(net.chainId))
        .finally(done);

      w = w.connect(p);
      expect(w.provider).toBeTruthy();
      expect(w.provider).toEqual(p);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should contain a valid Wallet with valid keys / address / provider', () => {
      expect(wallet).toBeTruthy();
      expect(wallet.address).toContain('0x');
      expect(wallet.publicKey).toBeTruthy();
      expect(wallet.privateKey).toBeTruthy();
      expect(wallet.mnemonic).toBeTruthy();
      expect(wallet.mnemonic.phrase).toBeTruthy();
      expect(wallet.mnemonic.phrase.split(' ').length).toEqual(12);
      expect(wallet.provider).toBeTruthy();
    });

    it('should initialize and use a deployed contract', (done: DoneFn) => {
      service.init()
        .then(_ => {
          expect(service.isDeployed()).toBeTrue();
          expect(service.contract).toBeTruthy();
        })
        .finally(done);
    });

  });
});
