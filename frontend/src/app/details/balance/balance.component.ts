import { Component, OnInit } from '@angular/core';
import { utils } from 'ethers';
import { EthService } from 'src/app';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.sass']
})
export class BalanceComponent implements OnInit {
  balance: string;

  constructor(private ethService: EthService) { }

  ngOnInit(): void {
    this.ethService.getBalance().then(b => this.balance = utils.formatUnits(b, 18));
  }

}
