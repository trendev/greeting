import { Component, NgZone, OnInit } from '@angular/core';
import { ethers, providers, utils } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import GreeterContract from '../contracts/Greeter.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  private _provider: providers.Web3Provider;
  private _signer: providers.JsonRpcSigner;

  greeting: string;
  blockNumber: Promise<number>;
  network: providers.Network;
  balance: string;
  address: Promise<string>;
  isConnected: boolean;
  greeterContractInstance: ethers.Contract;

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
    this.network = await this._provider.getNetwork();

    const netID = this.network.chainId;
    const networks = GreeterContract.networks as any
    const greeterContractAddress = networks[netID] && networks[netID].address;
    if (greeterContractAddress) {
      this.greeterContractInstance = new ethers.Contract(
        greeterContractAddress,
        GreeterContract.abi,
        this._signer
      );

      this.greeting = await this.greeterContractInstance.greet();
    } else {
      this.greeting = "NO SMART CONTRACT DEPLOYED IN THIS NETWORK";
    }

    this.address = this._signer.getAddress();
    const balance = await this._signer.getBalance('latest');
    this.balance = utils.formatUnits(balance, 18); //@TODO : create a Directive
    this.isConnected = true;
  }

}
