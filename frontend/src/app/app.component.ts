import { EthService } from './eth.service';
import { Component, OnInit } from '@angular/core';
import { providers, utils } from 'ethers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  blockNumber: Promise<number>;
  network: Promise<providers.Network>;
  balance: Promise<string>;
  address: Promise<string>;
  private _isConnected = false;

  constructor(private ethService: EthService) { }

  ngOnInit() {
    this.ethService.init()
      .then(() => this.fetchData())
      .then(connected => this._isConnected = connected);
  }

  get isConnected(): boolean {
    return this.ethService.isConnected() && this._isConnected;
  }

  private async fetchData() {
    try {
      this.blockNumber = this.ethService.getBlockNumber();
      this.network = this.ethService.getNetwork();
      this.address = this.ethService.getSigner().getAddress();
      this.balance = this.ethService.getSigner().getBalance('latest')
        .then(balance => utils.formatUnits(balance, 18)); //@TODO : create a Directive
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }

}
