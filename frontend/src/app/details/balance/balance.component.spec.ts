import { EthService } from 'src/app';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceComponent } from './balance.component';
import { BigNumber, utils } from 'ethers';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  let ethServiceSpy: jasmine.SpyObj<EthService>;
  const input = '1234561234567890987654321';
  let balance: BigNumber = BigNumber.from(input);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BalanceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`should format balance ${balance} tokens`, () => {
    const decimals = [11, input.length, 3, 15, 18, 9, -1, 13, 4, 33, input.length - 1, 6, 20, 32, 2, 0, 8, 7, 5, 1]
      .filter(d => d >= 0)
      .sort((x, y) => x - y);

    decimals.forEach(d => {
      let value: string;
      const l = input.length;
      let delta = l - d;

      if (delta > 0) {
        value = input.substring(0, l - d) + (d ? '.' + input.substring(l - d) : '');
      } else {
        value = '0.';
        delta = -delta;
        for (let i = 0; i < delta; i++) {
          value += '0';
        }
        value += input;
      }

      it(`${d} decimals : ${value}`, () => {
        expect(utils.formatUnits(balance, d)).toBe(value);
      });
    });

  });

  it('should contain a <h3> tag', () => {
    const elmt: HTMLElement = fixture.nativeElement;
    const h3 = elmt.querySelector('h3');
    expect(h3).toBeTruthy();
    expect(h3?.textContent).toContain('Balance');
  });

});
