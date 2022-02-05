import { Component, OnInit } from '@angular/core';
import { concatMap, from, Observable, timer } from 'rxjs';
import { EthService } from 'src/app';

@Component({
  selector: 'app-last-block-number',
  templateUrl: './last-block-number.component.html',
  styleUrls: ['./last-block-number.component.sass']
})
export class LastBlockNumberComponent implements OnInit {
  block$: Observable<number>;

  constructor(private ethService: EthService) { }

  ngOnInit(): void {
    this.block$ = timer(0, 3000).pipe(
      concatMap(_ => from(this.ethService.getBlockNumber())),
    );
  }

}
