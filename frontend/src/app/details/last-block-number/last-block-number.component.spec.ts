import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { finalize, first, take } from 'rxjs';
import { EthService } from 'src/app';

import { LastBlockNumberComponent } from './last-block-number.component';

describe('LastBlockNumberComponent', () => {
  let component: LastBlockNumberComponent;
  let fixture: ComponentFixture<LastBlockNumberComponent>;

  let ethServiceSpy: jasmine.SpyObj<EthService>;
  const block = 123456789;
  const incr = 11;
  const nblock = block + incr;

  beforeEach(async () => {
    ethServiceSpy = jasmine.createSpyObj<EthService>('EthService', ['getBlockNumber']);
    ethServiceSpy.getBlockNumber.and.resolveTo(block);
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule
      ],
      declarations: [LastBlockNumberComponent],
      providers: [{
        provide: EthService,
        useValue: ethServiceSpy
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastBlockNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a <mat-card-title> tag', () => {
    const elmt: HTMLElement = fixture.nativeElement;
    const title = elmt.querySelector('mat-card-title');
    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('Block');
  });

  describe('should contain the fake block in a <code> tag', () => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    for (let i = 1; i <= 3; i++) {
      it(` do ${i} refresh`, (done: DoneFn) => {
        expect(component.block$).toBeDefined();
        let count = 0;

        component.block$.pipe(
          take(i),
          finalize(() => (count === i) ? done() : done.fail(`only ${count}/${i} refresh of last block number`))
        ).subscribe(b => {
          expect(ethServiceSpy.getBlockNumber).toHaveBeenCalled();

          expect(b).toBeGreaterThan(0);
          expect(b).toEqual(block);

          fixture.detectChanges();
          const elmt: HTMLElement = fixture.nativeElement;
          const c = elmt.querySelector('code');
          expect(c).toBeTruthy();
          expect(c?.textContent).toBeTruthy();
          expect(c?.textContent).toEqual(`${block}`);
          count++;
        });
      });
    }

    it(`should display the latest block number ${nblock}`, (done: DoneFn) => {
      ethServiceSpy.getBlockNumber.and.resolveTo(nblock);

      component.block$.pipe(
        first(),
        finalize(done))
        .subscribe(b => {
          expect(b).toBe(nblock);

          fixture.detectChanges();
          const elmt: HTMLElement = fixture.nativeElement;
          const c = elmt.querySelector('code');
          expect(c).toBeTruthy();
          expect(c?.textContent).toBeTruthy();
          expect(c?.textContent).toContain(nblock);
        });
    });

  });

});
