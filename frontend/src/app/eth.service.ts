import { Injectable, NgZone } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { providers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class EthService {

  private _provider: providers.Web3Provider;

  private initialized = false;
  private _connected = false;

  constructor(private ngZone: NgZone) { }

  private async init() {
    if (!this.initialized) {
      this.initialized = true;
      const provider = await detectEthereumProvider() as any;

      if (provider) {
        provider.on('chainChanged', (chainID: string) => {
          this.ngZone.run(() => { // metamask events are not in Zone "angular"
            console.log('chainChanged', `new chain id : "${chainID}"(hex) "${parseInt(chainID, 16)}"(dec)`);
            window.location.reload();
          });
        });
        provider.on('accountsChanged', (accounts: string[]) => {
          this.ngZone.run(() => { // metamask events are not in Zone "angular"
            if (accounts.length === 0) { // disconnect from metamask
              this._connected = false;
            } else {
              console.log('accountsChanged', `new account = ${accounts[0]}`);
              this._connected = true; //useless because of window reload
              window.location.reload();
            }
          });
        });
        await provider.request({ method: 'eth_requestAccounts' }); // login

        this._provider = new providers.Web3Provider(provider, 'any');
        this._connected = true;
      }
    }
    return this._provider;
  }

  isInitialized() {
    return this.initialized;
  }

  isConnected() {
    return this._connected;
  }

  getProvider() {
    return this.init();
  }

  getSigner() {
    return this.getProvider()
      .then(p => p.getSigner());
  }

  getBlockNumber() {
    return this.getProvider()
      .then(p => p.getBlockNumber());
  }

  getNetwork() {
    return this.getProvider()
      .then(p => p.getNetwork());
  }

  getBalance() {
    return this.getSigner()
      .then(s => s.getBalance('latest'));
  }

  getAddress() {
    return this.getSigner()
      .then(s => s.getAddress());
  }
}
