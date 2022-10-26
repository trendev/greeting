import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedNetworkComponent } from './supported-network.component';

describe('SupportedNetworkComponent', () => {
  let component: SupportedNetworkComponent;
  let fixture: ComponentFixture<SupportedNetworkComponent>;

  const fuji = {
    protocol: 'AVALANCHE',
    name: 'Fuji',
    testnet: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportedNetworkComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportedNetworkComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 4 testnets', () => {
    expect(component.networks).toBeTruthy();
    expect(component.networks.length).toEqual(4);
  });

  it('should contain avalanche fuji network', () => {
    expect(component.networks).toBeTruthy();

    const jsonFuji = JSON.stringify(fuji);
    const net = component.networks.find(n => JSON.stringify(n) === jsonFuji);
    expect(net).toBeDefined();
    expect(net).toBeTruthy();
    expect(net).toEqual(fuji);
  });

  it('should contain unsorted networks before ngOnInit()', () => {
    expect(component.networks).toBeTruthy();
    const networks = [...component.networks];
    expect(networks.slice(1).every((e, i) => component.compareNetworks(e, networks[i]) >= 0)).toBeFalsy(); // stop not ordered
    expect(networks).toEqual(component.networks);
    expect(networks.sort(component.compareNetworks)).not.toEqual(component.networks);
  });

  it('should contain sorted networks after ngOnInit()', () => {
    expect(component.networks).toBeTruthy();
    const networks = [...component.networks];
    expect(networks).toEqual(component.networks);

    spyOn(component, 'compareNetworks').and.callThrough();
    fixture.detectChanges(); // after ngOnInit, should call compareNetworks()
    expect(component.compareNetworks).toHaveBeenCalled();

    expect(networks).not.toEqual(component.networks);
    expect(component.networks.slice(1).every((e, i) => component.compareNetworks(e, component.networks[i]) >= 0)).toBeTrue(); // should be ordered
    expect(networks.sort(component.compareNetworks)).toEqual(component.networks);
  });

  it('should contain <table> tag with multiple rows', () => {
    fixture.detectChanges();

    const appElement: HTMLElement = fixture.nativeElement;
    expect(appElement).toBeDefined();
    const table = appElement.querySelector('table');
    expect(table).toBeDefined();
    const rows = table?.querySelectorAll('tr');
    expect(rows).toBeDefined();
    expect(rows?.length).toBe(component.networks.length + 1); // +1 for header

    for (let i = 0; i < component.networks.length + 1; i++) {
      if (i === 0) {
        const headerRow = rows?.item(0);
        const headers = headerRow?.querySelectorAll('th');
        expect(headers?.length).toBe(3);
      } else {
        const dataRow = rows?.item(i);
        const data = dataRow?.querySelectorAll('code');
        expect(data?.length).toBe(3);

        expect(data?.item(0).textContent).toBe(component.networks[i - 1].protocol);
        expect(data?.item(1).textContent).toBe(component.networks[i - 1].name);
        expect(data?.item(2).textContent).toBe(component.networks[i - 1].testnet ? '🔵' : '');
      }
    }
  });
});
