import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { providers } from 'ethers';
import { EthService } from 'src/app';

import { NetworkDetailsComponent } from './network-details.component';

describe('NetworkDetailsComponent', () => {
  let component: NetworkDetailsComponent;
  let fixture: ComponentFixture<NetworkDetailsComponent>;

  let ethServiceSpy: jasmine.SpyObj<EthService>;
  const network: providers.Network = { name: "net", chainId: 7777, ensAddress: '0xab01234cd56789ef' };

  beforeEach(async () => {
    ethServiceSpy = jasmine.createSpyObj<EthService>('EthService', ['getNetwork']);
    ethServiceSpy.getNetwork.and.resolveTo(network);

    await TestBed.configureTestingModule({
      declarations: [NetworkDetailsComponent],
      providers: [{
        provide: EthService,
        useValue: ethServiceSpy
      }]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the stub Network', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(ethServiceSpy.getNetwork).toHaveBeenCalled();
      expect(component.network).toEqual(network);
    });
  }));

  it('should contain a <h3> tag', () => {
    const elmt: HTMLElement = fixture.nativeElement;
    const h3 = elmt.querySelector('h3');
    expect(h3).toBeTruthy();
    expect(h3?.textContent).toContain('Network');
  });

  it('should contain a <code> tag', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.network).toEqual(network);
      const elmt: HTMLElement = fixture.nativeElement;
      const c = elmt.querySelector('code');
      expect(c).toBeTruthy();
      expect(c?.textContent).toBeTruthy();
      expect(network).toEqual(JSON.parse(`${c?.textContent}`));
    });
  }));

});
