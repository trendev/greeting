import { EthService } from 'src/app';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceComponent } from './balance.component';
import { BigNumber, utils } from 'ethers';
import { finalize, first, take } from 'rxjs';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  let ethServiceSpy: jasmine.SpyObj<EthService>;
  const input = '1234561234567890987654321';
  let balance: BigNumber = BigNumber.from(input);
  const incr = 111;

  beforeEach(async () => {
    ethServiceSpy = jasmine.createSpyObj<EthService>('EthService', ['getBalance']);
    ethServiceSpy.getBalance.and.resolveTo(balance);
    await TestBed.configureTestingModule({
      declarations: [BalanceComponent],
      providers: [{
        provide: EthService,
        useValue: ethServiceSpy
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe(`should format balance ${balance}`, () => {
    const decimals = [11, input.length, 3, 15, 18, 9, -1, 13, 33, input.length - 1, 20, 32, 2, 0, 8, 7, 5, 1]
      .filter(d => d >= 0)
      .sort((x, y) => x - y);

    decimals.forEach(d => {
      let value: string;
      const l = input.length;
      let delta = l - d;
      const b = utils.formatUnits(balance, d);

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

      describe(`value ${value}`, () => {

        it(`contains ${d} decimals`, () => {
          const rexp = new RegExp(`^\\d*.?(\\d){${d}}`, 'g');
          const i = b.search(rexp);
          expect(i).not.toEqual(-1);
        });

        it('is the expected value', () => {
          expect(b).toBe(value);
        });
      });
    });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a <h3> tag', () => {
    const elmt: HTMLElement = fixture.nativeElement;
    const h3 = elmt.querySelector('h3');
    expect(h3).toBeTruthy();
    expect(h3?.textContent).toContain('Balance');
  });

  describe('should contain the fake balance in a <code> tag', () => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    for (let i = 1; i <= 2; i++) {
      it(` do ${i} refresh`, (done: DoneFn) => {
        expect(component.balance$).toBeDefined();
        let count = 0;

        component.balance$.pipe(
          take(i),
          finalize(() => (count === i) ? done() : done.fail(`only ${count}/${i} refresh of balance`))
        ).subscribe(b => {
          expect(ethServiceSpy.getBalance).toHaveBeenCalled();

          const bal = utils.formatUnits(balance, component.decimal);
          expect(b).toBe(bal);

          fixture.detectChanges();
          const elmt: HTMLElement = fixture.nativeElement;
          const c = elmt.querySelector('code');
          expect(c).toBeTruthy();
          expect(c?.textContent).toBeTruthy();
          expect(c?.textContent).toEqual(`${bal}`);
          count++;
        });
      });
    }
  });

  it(`should display the new balance (+${incr} coins)`, (done: DoneFn) => {
    const bal = balance.add(incr);
    ethServiceSpy.getBalance.and.resolveTo(bal);

    component.balance$.pipe(
      first(),
      finalize(done))
      .subscribe(b => {
        const s = utils.formatUnits(bal, component.decimal);
        expect(b).toBe(s);

        fixture.detectChanges();
        const elmt: HTMLElement = fixture.nativeElement;
        const c = elmt.querySelector('code');
        expect(c).toBeTruthy();
        expect(c?.textContent).toBeTruthy();
        expect(c?.textContent).toBe(s);
      });
  });

});
