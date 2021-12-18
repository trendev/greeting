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
        console.log(`chain changed`);
        window.location.reload();
      });

      await provider.request({ method: 'eth_requestAccounts' });

      //@TODO : improve this one
      provider.on('accountsChanged', (accounts: any)=>{
        console.info('accounts changed');
        // window.location.reload();
      });
      
      this._provider = new providers.Web3Provider(provider, 'any');
      this._signer = this._provider.getSigner();

      // this._provider.on("network", (newNetwork, oldNetwork) => {
      //   if (oldNetwork) {
      //     console.log(`changing network from ${oldNetwork} to ${newNetwork}`);
      //     window.location.reload();
      //   }
      // });
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
