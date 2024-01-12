import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
        MatCardModule,
        NoopAnimationsModule
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

  it('should have a default state', () => {
    expect(component.state).toBeTruthy();
    expect(component.state).toBe('set');
  });

  it('should change the state', () => {
    const spy = spyOn(component, 'onDone').and.callThrough();
    component.state = 'updating';
    component.onDone({ toState: 'updating' } as any);
    expect(spy).toHaveBeenCalled();
    expect(component.state).toBe('set');
  });

  describe('should contain the fake block in a <code> tag', () => {
    const N = 3;

    for (let i = 1; i <= N; i++) {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000 * N + 1000;

      it(` do ${i} update${i > 1 ? 's' : ''} `, (done: DoneFn) => {

        expect(component.block$).toBeDefined();
        let count = 0;

        const blocks: number[] = [];
        for (let j = 0; j < i; j++) {
          blocks.push(block + j);
          blocks.push(block + j); // 2x subscription : this test + async pipe in html template
        }
        const promises = blocks.map(b => Promise.resolve(b));
        ethServiceSpy.getBlockNumber.and.returnValues(...promises);

        component.block$.pipe(
          take(i),
          finalize(() => (count === i) ? done() : done.fail(`only ${count} /${i} refresh of last block number`))
        ).subscribe(b => {
          expect(ethServiceSpy.getBlockNumber).toHaveBeenCalled();

          expect(b).toBeGreaterThan(0);
          expect(b).toEqual(blocks[count * 2]);

          fixture.detectChanges();
          const elmt: HTMLElement = fixture.nativeElement;
          const c = elmt.querySelector('code');
          expect(c).toBeTruthy();
          expect(c?.textContent).toBeTruthy();
          expect(c?.textContent).toEqual(`${blocks[count * 2]}`);
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
