import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { concatMap, from, Observable, tap, timer, distinctUntilChanged } from 'rxjs';
import { EthService } from 'src/app';

export const delay = 500;

@Component({
  selector: 'app-last-block-number',
  animations: [
    trigger('update', [
      state('updating', style({
        opacity: 0,
        fontSize: '150%',
      })),
      state('set', style({
        opacity: 1,
        fontSize: '100%',
      })),
      transition('updating => set', animate(delay))
    ]),
  ],
  templateUrl: './last-block-number.component.html',
  styleUrls: ['./last-block-number.component.sass']
})
export class LastBlockNumberComponent implements OnInit {
  block$: Observable<number>;
  updating = false;
  private _block: number;

  constructor(private ethService: EthService) { }

  ngOnInit(): void {
    this.block$ = timer(0, 3000).pipe(
      concatMap(_ => from(this.ethService.getBlockNumber())),
      distinctUntilChanged(),
      tap(b => {
        if (b !== this._block) {
          this.updating = true;
          this._block = b;
          setTimeout(() => this.updating = false, delay); // delay to change the state
        }
      })
    );
  }

}
