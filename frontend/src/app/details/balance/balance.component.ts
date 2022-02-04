import { Component, OnInit } from '@angular/core';
import { utils } from 'ethers';
import { Observable, interval, switchMap, from, map } from 'rxjs';
import { EthService } from 'src/app';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.sass']
})
export class BalanceComponent implements OnInit {
  balance$: Observable<string>;

  constructor(private ethService: EthService) { }

  ngOnInit(): void {
    this.balance$ = interval(3000).pipe(
      switchMap(_ => from(this.ethService.getBalance())),
      map(n => utils.formatUnits(n, 18))
    );
  }

}
