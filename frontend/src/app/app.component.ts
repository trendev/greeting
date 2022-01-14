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
  network: providers.Network;
  balance: string;
  address: Promise<string>;
  private _isConnected: boolean;

  constructor(private ethService: EthService) { }

  ngOnInit() {
    this.initProviderAndFetchData();
  }

  private async initProviderAndFetchData() {
    await this.ethService.init();
    this.fetchData();
  }

  get isConnected(): boolean {
    return this.ethService.isConnected() && this._isConnected;
  }
  
  private async fetchData() {
    this.blockNumber = this.ethService.getBlockNumber();
    this.network = await this.ethService.getNetwork();

    this.address = this.ethService.getSigner().getAddress();
    const balance = await this.ethService.getSigner().getBalance('latest');
    this.balance = utils.formatUnits(balance, 18); //@TODO : create a Directive
    this._isConnected = true;
  }

}
