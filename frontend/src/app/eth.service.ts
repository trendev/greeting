import { Injectable, NgZone } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { providers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class EthService {

  private _provider: providers.Web3Provider;
  private _signer: providers.JsonRpcSigner;

  private initialized: boolean;
  private _connected: boolean;

  constructor(private ngZone: NgZone) { }

  async init() {
    if (!this.initialized) {
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
        this._signer = this._provider.getSigner();
        this.initialized = true;
        this._connected = true;
      }
    } // else; already initialized
  }

  isConnected() {
    return this._connected;
  }

  getProvider() {
    return this._provider;
  }

  getSigner() {
    return this._signer;
  }

  getBlockNumber() {
    return this._provider.getBlockNumber();
  }

  getNetwork() {
    return this._provider.getNetwork();
  }

}