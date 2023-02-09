import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
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
      imports: [
        MatCardModule
      ],
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

  it('should contain the fake address', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(ethServiceSpy.getAddress).toHaveBeenCalled();
      expect(component.address).toEqual(address);
    });
  }));

  it('should contain a <mat-card-title> tag', () => {
    const elmt: HTMLElement = fixture.nativeElement;
    const title = elmt.querySelector('mat-card-title');
    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('Address');
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
