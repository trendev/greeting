import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { providers } from 'ethers';
import { EthService } from 'src/app';

import { EthAddressComponent } from './eth-address.component';

describe('EthAddressComponent', () => {
  let component: EthAddressComponent;
  let fixture: ComponentFixture<EthAddressComponent>;

  let ethServiceSpy: jasmine.SpyObj<EthService>;
  const address: string = '0x8e29D12B3Df274C2Df416B423ccc466A56bEbFE2';


  beforeEach(async () => {
    ethServiceSpy = jasmine.createSpyObj<EthService>('EthService', ['getAddress']);
    ethServiceSpy.getAddress.and.resolveTo(address);

    await TestBed.configureTestingModule({
      declarations: [EthAddressComponent],
      providers: [{
        provide: EthService,
        useValue: ethServiceSpy
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EthAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the stub address', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(ethServiceSpy.getAddress).toHaveBeenCalled();
      expect(component.address).toEqual(address);
    });
  }));

  it('should contain a <h3> tag', () => {
    const elmt: HTMLElement = fixture.nativeElement;
    const h3 = elmt.querySelector('h3');
    expect(h3).toBeTruthy();
    expect(h3?.textContent).toContain('Your Ethereum Address');
  });

  it('should contain a <code> tag', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.address).toEqual(address);
      const elmt: HTMLElement = fixture.nativeElement;
      const c = elmt.querySelector('code');
      expect(c).toBeTruthy();
      expect(c?.textContent).toBeTruthy();
      expect(c?.textContent).toEqual(address);
    });
  }));
});
