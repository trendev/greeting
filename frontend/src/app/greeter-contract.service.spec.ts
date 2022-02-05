import { EthService } from './eth.service';
import { catchError, EMPTY, finalize, of, tap } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import { GreeterContractService } from './greeter-contract.service';

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

  //TODO : use stub contract and fake eth service
  describe('is not deployed', () => {
    let ethServiceSpy: jasmine.SpyObj<EthService>;

    beforeEach(() => {
      ethServiceSpy = jasmine.createSpyObj<EthService>('EthService', ['getNetwork','getSigner','getAddress']);
      // ethServiceSpy.isInitialized.and.resolveTo(true);

      TestBed.configureTestingModule({
        providers: [{
          provide: EthService,
          useValue: ethServiceSpy
        }]
      });
      service = TestBed.inject(GreeterContractService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should not be deployed', () => {
      expect(service.isDeployed()).toBeFalsy();
    });

  });
});
