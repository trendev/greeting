import { EthService } from './eth.service';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import GreeterContract from '../contracts/Greeter.json';
import { from, map, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreeterContractService {
  private initialized: boolean;
  private _deployed: boolean;
  private contract: ethers.Contract;

  constructor(private ethService: EthService) { }

  async init() {
    if (!this.initialized) {
      await this.ethService.init();
      const { chainId } = await this.ethService.getNetwork();

      const networks = GreeterContract.networks as any
      const address = networks[chainId]?.address;

      if (address) {
        const contract = new ethers.Contract(
          address,
          GreeterContract.abi,
          this.ethService.getSigner()
        );

        try {
          await contract.deployed(); // control contract is deployed & valid

          this._deployed = true;
          this.contract = contract;

          this.contract.on('GreetingUpdated', (address, oldGreeting, greeting) => {
            console.log(`GreetingUpdated: ${address} changed "${oldGreeting}" into "${greeting}"`);
          });
        } catch (err) {
          console.warn(err); // contract not deployed
        }
      }
      this.initialized = true;
    } // else; already initialized
  }

  isDeployed() {
    return this._deployed;
  }

  greet() {
    return this.contract?.greet();
  }

  getAddress(): string {
    return this.contract?.address;
  }

  setGreeting(message: string) {
    const tx = this.contract.setGreeting(message) as Promise<ethers.providers.TransactionResponse>;

    return from(tx).pipe(
      take(1),
      switchMap(t => t.wait()),
      map(r => r.status),
    );
  }

}
