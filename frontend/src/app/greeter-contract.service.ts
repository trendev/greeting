import { EthService } from './eth.service';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import GreeterContract from '../contracts/Greeter.json';

@Injectable({
  providedIn: 'root'
})
export class GreeterContractService {
  private initialized: boolean;
  private _deployed: boolean;
  private _greeterContractInstance: ethers.Contract;

  constructor(private ethService: EthService) { }

  async init() {
    if (!this.initialized) {
      await this.ethService.init();
      const { chainId } = await this.ethService.getNetwork();

      const networks = GreeterContract.networks as any
      const greeterContractAddress = networks[chainId] && networks[chainId].address;

      if (greeterContractAddress) {
        this._greeterContractInstance = new ethers.Contract(
          greeterContractAddress,
          GreeterContract.abi,
          this.ethService.getSigner()
        );

        this._deployed = true;

      } else {
        this._deployed = false;
      }
      this.initialized = true;
    } // else; already initialized
  }

  isDeployed() {
    return this._deployed;
  }

  greet() {
    return this._greeterContractInstance?.greet();
  }

  getAddress(): string {
    return this._greeterContractInstance?.address;
  }

}
