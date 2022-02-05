import { Component, OnInit } from '@angular/core';
import { utils } from 'ethers';
import { Observable, from, map, timer, concatMap } from 'rxjs';
import { EthService } from 'src/app';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.sass']
})
export class BalanceComponent implements OnInit {
  balance$: Observable<string>;
  decimal = 18;

  constructor(private ethService: EthService) { }

  ngOnInit(): void {
    this.balance$ = timer(0, 3000).pipe(
      concatMap(_ => from(this.ethService.getBalance())),
      map(n => utils.formatUnits(n, this.decimal))
    )
  }

}
