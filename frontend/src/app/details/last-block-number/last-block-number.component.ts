import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { concatMap, from, Observable, tap, timer, distinctUntilChanged } from 'rxjs';
import { EthService } from 'src/app';

const delay = 500;

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
  state: 'updating' | 'set' = 'set';

  constructor(private ethService: EthService) { }

  ngOnInit(): void {
    this.block$ = timer(0, 3000).pipe(
      concatMap(_ => from(this.ethService.getBlockNumber())),
      distinctUntilChanged(),
      tap(_ => this.state = 'updating')
    );
  }

  onDone(event: AnimationEvent) {
    if (event.toState === 'updating') { // changes the state when update animation is done
      this.state = 'set';
    }
  }

}
