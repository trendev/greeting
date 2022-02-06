import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { GreeterContractService } from '../greeter-contract.service';

import { GreetingComponent } from './greeting.component';

describe('GreetingComponent', () => {
  let component: GreetingComponent;
  let fixture: ComponentFixture<GreetingComponent>;

  const contractService: Partial<GreeterContractService> = {
    init: () => Promise.resolve(),
    isDeployed: () => true,
    greet: () => 'greet',
    getAddress: () => '0x123456789abcdef',
    setGreeting: (message: string) => of(1),
    greetingUpdates: () => new Subject<string[]>(),
    logs: () => of([]),
    isOwner: () => of(true)
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [GreetingComponent],
      providers: [{
        provide: GreeterContractService,
        useValue: contractService
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
      expect(component.greetClass).toBe('done');
      expect(component.isOwner$).toBeTruthy();
      expect(component.isDeployed).toBeTrue();
      expect(component.isDeployed).toBeTruthy();
    });
  }));
});
