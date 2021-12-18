import { Component, OnInit } from '@angular/core';
import { BigNumber, providers, utils } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  private _provider: providers.Web3Provider;
  private _signer: providers.JsonRpcSigner;

  greeting = 'hello world 😘';
  blockNumber: Promise<number>;
  network: Promise<providers.Network>;
  balance: string;
  address: Promise<string>;

  //@TODO : move setup in dedicated and injectable service
  async ngOnInit() {
    const provider = await detectEthereumProvider() as any;

    if (provider) {

      provider.on('chainChanged', () => {
        window.location.reload();
      });

      provider.on('accountsChanged', () => {
        window.location.reload();
      });

      await provider.request({ method: 'eth_requestAccounts' });

      this._provider = new providers.Web3Provider(provider, 'any');
      this._signer = this._provider.getSigner();

      this.fetchData();
    } else {
      console.error(`metamask must be installed`);
    }

  }

  private async fetchData() {
    this.blockNumber = this._provider.getBlockNumber();
    this.network = this._provider.getNetwork();
    this.address = this._signer.getAddress();
    const balance = await this._signer.getBalance('latest');
    this.balance = utils.formatUnits(balance, 18);
  }

}
