import { EthService } from './eth.service';
import { Component, OnInit } from '@angular/core';
import { providers, utils } from 'ethers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  blockNumber: number;
  balance: string;
  
  private _canFetchData = false;

  constructor(private ethService: EthService) { }

  ngOnInit() {
    this.fetchData()
      .then(result => this._canFetchData = result);
  }

  get canFetchData(): boolean {
    return this.ethService.isConnected() && this._canFetchData;
  }

  private async fetchData() {
    try {
      this.blockNumber = await this.ethService.getBlockNumber();
      this.balance = await this.ethService.getBalance()?.then(balance => utils.formatUnits(balance, 18)); //@TODO : create a Directive
    } catch (err) {
      return false;
    }
    return true;
  }

}
