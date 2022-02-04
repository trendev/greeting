import { EthService } from './eth.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-supported-network', template: '<h2>Networks</h2><table></table>' })
class SupportedNetworkStubComponent {
}

@Component({ selector: 'app-balance', template: '<h3>Balance</h3>' })
class BalanceStubComponent {
}

@Component({ selector: 'app-eth-address', template: '<h3>Address</h3>' })
class EthAddressStubComponent {
}

@Component({ selector: 'app-last-block-number', template: '<h3>Block</h3>' })
class LastBlockNumberStubComponent {
}

@Component({ selector: 'app-network-details', template: '<h3>Network</h3>' })
class NetworkDetailsStubComponent {
}

@Component({ selector: 'app-greeting', template: '<h3>Greeting</h3>' })
class GreetingStubComponent {
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  describe('is not initialized and', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ],
        declarations: [
          SupportedNetworkStubComponent,
          AppComponent
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create the app component', () => {
      expect(component).toBeTruthy();
    });

    it('can not fetch data', () => {
      expect(component.canFetchData).toBeFalse();
    });

    const tags = [
      {
        tag: 'h1',
        msg: 'Metamask Authentication REQUIRED'
      },
      {
        tag: 'h3',
        msg: 'Other networks are not supported yet...'
      },
      {
        tag: 'h4',
        msg: 'All Github sources'
      }
    ];

    tags.forEach(t => {
      it(`should have <${t.tag}> with text "${t.msg}"`, () => {
        const appElement: HTMLElement = fixture.nativeElement;
        expect(appElement).toBeDefined();
        const elmt = appElement.querySelector(t.tag)!;
        expect(elmt).toBeDefined();
        expect(elmt.textContent).toBeDefined();
        expect(elmt.textContent).toContain(t.msg);
      });
    });

    it('should have <app-supported-network> with 2 Elements', () => {
      const appElement: HTMLElement = fixture.nativeElement;
      expect(appElement).toBeDefined();
      const elmt = appElement.querySelector('app-supported-network')!;
      expect(elmt).toBeDefined();
      expect(elmt.hasChildNodes()).toBeTrue();
      expect(elmt.childElementCount).toEqual(2); //<h2> + <table>
    });
  });

  describe('is initialized and', () => {

    let ethServiceSpy: jasmine.SpyObj<EthService>;

    beforeEach(waitForAsync(() => {
      ethServiceSpy = jasmine.createSpyObj<EthService>('EthService', ['isInitialized']);
      ethServiceSpy.isInitialized.and.resolveTo(true);

      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ],
        declarations: [
          SupportedNetworkStubComponent,
          BalanceStubComponent,
          EthAddressStubComponent,
          LastBlockNumberStubComponent,
          NetworkDetailsStubComponent,
          GreetingStubComponent,
          AppComponent
        ],
        providers: [{
          provide: EthService,
          useValue: ethServiceSpy
        }]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create the app component', () => {
      expect(component).toBeTruthy();
    });

    it('can fetch data with DoneFn', (done: DoneFn) => {
      expect(ethServiceSpy.isInitialized).toHaveBeenCalled();
      ethServiceSpy.isInitialized().then(_ => expect(component.canFetchData).toBeTrue())
        .finally(done);
    });

    it('can fetch data with fakeAsync', waitForAsync(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(ethServiceSpy.isInitialized).toHaveBeenCalled();
        expect(component.canFetchData).toBeTrue();
      });
    }));

    xit('should contain XXX component', () => { });
  });
});
