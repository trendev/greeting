import { Component, OnInit } from '@angular/core';
import { from, interval, Observable, switchMap, tap } from 'rxjs';
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
    this.block$ = interval(3000).pipe(
      switchMap(_ => from(this.ethService.getBlockNumber())),
    );
  }

}
