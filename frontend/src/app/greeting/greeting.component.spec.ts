import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ethers } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { from, of, Subject, throwError } from 'rxjs';
import { GreeterContractService } from '../greeter-contract.service';

import { GreetingComponent } from './greeting.component';

const _greetingUpdates$ = new Subject<string[]>();

const count = 3;
const events: ethers.Event[] = [];

for (let i = 0; i < count; i++) {
  events.push({
    event: 'GreetingUpdated',
    args: {
      oldGreeting: `event-${i}`
    } as Partial<Result>,
    blockNumber: i
  } as ethers.Event);
}

const service: Partial<GreeterContractService> = {
  init: () => Promise.resolve(),
  isDeployed: () => true,
  greet: () => 'greet',
  getAddress: () => '0x123456789abcdef',
  setGreeting: (message: string) => of(1),
  greetingUpdates: () => _greetingUpdates$,
  logs: () => of(events),
  isOwner: () => of(true)
};

let serviceSetGreetingError = { ...service };
serviceSetGreetingError.setGreeting = (message: string) => throwError(() => new Error('setGreeting() failed'));

let serviceLogsError = { ...service };
serviceLogsError.logs = () => throwError(() => new Error('logs() failed'));

describe('GreetingComponent', () => {
  let component: GreetingComponent;
  let fixture: ComponentFixture<GreetingComponent>;

  describe('using fake GreeterContractService', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports:[MatCardModule],
        declarations: [GreetingComponent],
        providers: [{
          provide: GreeterContractService,
          useValue: service
        }]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(GreetingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be initialized', waitForAsync(() => {
      fixture.whenStable().then(() => {
        expect(component.greet).toBe('greet');
        expect(component.status).toBe('done');
        expect(component.disabled).toBeFalse();
        expect(component.isDeployed).toBeTrue();
        expect(component.previousGreets).toHaveSize(count);
        expect(component.isOwner$).toBeTruthy();
      });
    }));

    it('should set greeting', fakeAsync(() => {
      const msg = 'hello world';
      component.setGreeting(msg);

      fixture.detectChanges();
      tick();

      expect(component.disabled).toBeFalse();
      expect(component.status).toBe('done');
      expect(component.greet).toBe(msg);
    }));

    it('should get greeting updates', waitForAsync(() => {
      const log = ['old message', 'new message'];

      fixture.whenStable().then(() => {
        service.greetingUpdates!().next(log);
        expect(component.previousGreets).toHaveSize(count + 1);
        expect(component.previousGreets).toContain(log[0]);
        expect(component.greet).toEqual(log[1]);
      });

    }));
  });

  describe('using fake GreeterContractService with setGreeting() Error', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports:[MatCardModule],
        declarations: [GreetingComponent],
        providers: [{
          provide: GreeterContractService,
          useValue: serviceSetGreetingError
        }]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(GreetingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not set greeting', waitForAsync(() => {
      const msg = 'hello world';
      component.setGreeting(msg);
      fixture.whenStable().then(() => {
        expect(component.disabled).toBeFalse();
        expect(component.status).toBe('done');
        expect(component.greet).toBe('greet');
      });
    }));
  });

  describe('using fake GreeterContractService with logs() Error', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports:[MatCardModule],
        declarations: [GreetingComponent],
        providers: [{
          provide: GreeterContractService,
          useValue: serviceLogsError
        }]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(GreetingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have empty previous greets', waitForAsync(() => {
      fixture.whenStable().then(() => {
        expect(component.previousGreets).toBeDefined();
        expect(component.previousGreets).toHaveSize(0);
      });
    }));
  });
});
