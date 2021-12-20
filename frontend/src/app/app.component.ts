import { Component, NgZone, OnInit } from '@angular/core';
import { providers, utils } from 'ethers';
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
  isConnected: boolean;

  constructor(private ngZone: NgZone) { // metamask events are not in Zone "angular"
  }

  //@TODO : move setup in dedicated and injectable service
  async ngOnInit() {
    const provider = await detectEthereumProvider() as any;

    if (provider) {

      provider.on('chainChanged', (chainID: string) => {
        this.ngZone.run(() => { // metamask events are not in Zone "angular"
          console.log('chainChanged', `new chain id : "${chainID}"(hex) "${parseInt(chainID, 16)}"(dec)`);
          this.initProviderAndFetchData(provider);
        });
      });

      provider.on('accountsChanged', (accounts: string[]) => {
        this.ngZone.run(() => { // metamask events are not in Zone "angular"
          if (accounts.length === 0) { // disconnect from metamask
            this.isConnected = false;
          } else {
            console.log('accountsChanged', `new account = ${accounts[0]}`);
            this.initProviderAndFetchData(provider);
          }
        });
      });

      this.initProviderAndFetchData(provider);
    }
  }

  private async initProviderAndFetchData(provider: any) {
    await provider.request({ method: 'eth_requestAccounts' });

    this._provider = new providers.Web3Provider(provider, 'any');
    this._signer = this._provider.getSigner();

    this.fetchData();
  }

  private async fetchData() {
    this.blockNumber = this._provider.getBlockNumber();
    this.network = this._provider.getNetwork();
    this.address = this._signer.getAddress();
    const balance = await this._signer.getBalance('latest');
    this.balance = utils.formatUnits(balance, 18); //@TODO : create a Directive
    this.isConnected = true;
  }

}
