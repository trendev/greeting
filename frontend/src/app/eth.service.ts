import { Injectable, NgZone } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { providers, Signer } from 'ethers';
import { customNetworks } from './eth-net';

@Injectable({
  providedIn: 'root',
})
export class EthService {

  private _provider: providers.Web3Provider;

  private _initialized = false;
  private _connected = false;

  constructor(private ngZone: NgZone) { }

  private async init() {
    if (!this._initialized) {
      this._initialized = true;
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

  async isInitialized() {
    if (this._initialized) {
      return true;
    }
    return this.init().then(provider => provider ? true : false);
  }

  isConnected() {
    return this._connected;
  }

  getProvider() {
    return this.init();
  }

  getSigner(): Promise<Signer> {
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

  //@TODO : to test
  getCustomNetworks() {
    return customNetworks;
  }

  //@TODO : to test
  getCustomNetworksNames() {
    return this.getCustomNetworks().map(n => n.chainName).sort();
  }

  //@TODO : to test
  addEthNetwork(chainName: string) {
    return this.getProvider().then(p => {
      if (p && p.provider.isMetaMask) {
        const provider = p.provider;
        const net = this.getCustomNetworks().filter(n => n.chainName === chainName).pop();
        if (net) {
          return provider.request!({
            method: 'wallet_addEthereumChain',
            params: [net]
          });
        } else {
          throw new Error("Unsupported Ethereum Network definition");
        }
      }
      throw new Error("Provider is not MetaMask");
    });
  }
}

