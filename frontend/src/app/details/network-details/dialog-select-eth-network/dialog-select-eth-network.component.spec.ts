import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectEthNetworkComponent } from './dialog-select-eth-network.component';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';


const N = 5;
let networks: string[] = [];

for (let i = 0; i < N; i++) {
  networks.push(`net-${i}`);
}

describe('DialogSelectEthNetworkComponent', () => {
  let component: DialogSelectEthNetworkComponent;
  let fixture: ComponentFixture<DialogSelectEthNetworkComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      declarations: [DialogSelectEthNetworkComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            networks: networks
          }
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectEthNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get undefined network', () => {
    expect(component.network).toBeUndefined();
  });

  it(`should get ${networks.length} networks`, () => {
    expect(component.networks).toBeTruthy();
    expect(component.networks).toHaveSize(networks.length);
  });

  it('should select first network', async () => {
    const select = await loader.getHarness(MatSelectHarness);

    expect(select).toBeTruthy();

    expect(await select.getValueText()).toBeFalsy();
    expect(await select.isMultiple()).toBeFalse();
    expect(await select.isEmpty()).toBeTrue();
    expect(await select.isOpen()).toBeFalse();

    await select.open();

    expect(await select.isOpen()).toBeTrue();

    const options = await select.getOptions();

    expect(options).toBeTruthy();
    expect(options).toHaveSize(networks.length);

    const s = 0;
    const option = options[s];
    const net = await option.getText();
    expect(net).toEqual(networks[s]);

    await option.click();

    expect(await option.isSelected()).toBeTrue();
    expect(component.network).toBeDefined();
    expect(component.network).toEqual(net);
    expect(component.network).toEqual(networks[s]);

    await select.close();
    expect(await select.isOpen()).toBeFalse();
  });

});
