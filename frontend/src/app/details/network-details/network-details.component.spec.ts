import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { providers } from 'ethers';
import { EthService } from 'src/app';

import { NetworkDetailsComponent } from './network-details.component';
import { MatDialog } from '@angular/material/dialog';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {  MatButtonHarness } from '@angular/material/button/testing';


describe('NetworkDetailsComponent', () => {
  let component: NetworkDetailsComponent;
  let fixture: ComponentFixture<NetworkDetailsComponent>;
  let loader: HarnessLoader;

  let ethServiceSpy: jasmine.SpyObj<EthService>;
  const network: providers.Network = { name: "net", chainId: 7777, ensAddress: '0xab01234cd56789ef' };

  beforeEach(async () => {
    ethServiceSpy = jasmine.createSpyObj<EthService>('EthService', ['getNetwork', 'addEthNetwork', 'getCustomNetworksNames']);
    ethServiceSpy.getNetwork.and.resolveTo(network);
    ethServiceSpy.addEthNetwork.and.resolveTo(true);
    ethServiceSpy.getCustomNetworksNames.and.returnValue([network.name]);

    await TestBed.configureTestingModule({
      imports: [
        MatCardModule
      ],
      declarations: [NetworkDetailsComponent],
      providers: [{
        provide: EthService,
        useValue: ethServiceSpy
      }, {
        provide: MatDialog,
        useValue: {
          open: () => {
            return {
              afterClosed: () => of(network.name)
            }
          }
        }
      }]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the fake Network', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(ethServiceSpy.getNetwork).toHaveBeenCalled();
      expect(component.network).toEqual(network);
    });
  }));

  it('should contain a <mat-card-title> tag', () => {
    const elmt: HTMLElement = fixture.nativeElement;
    const title = elmt.querySelector('mat-card-title');
    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('Network');
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

  it('should add/switch ethereum network', waitForAsync(() => {
    const spy = spyOn(console, 'error');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.addEthNetwork();
      expect(ethServiceSpy.addEthNetwork).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
    });
  }));

  it('should call addNetwork() clicking on button', async () => {
    const button = await loader.getHarness(MatButtonHarness);
    expect(button).toBeTruthy();
    expect(await button.getText()).toBe('Add/Switch Custom Network');

    const spy = spyOn(component, 'addEthNetwork');
    await button.click();
    expect(spy).toHaveBeenCalled();
  });

});
