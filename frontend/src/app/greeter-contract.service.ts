import { EthService } from './eth.service';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import GreeterContract from '../contracts/Greeter.json';
import { map, Subject, switchMap, take, zipWith, from, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreeterContractService {
  private _initialized: boolean;
  private _deployed: boolean;
  private _greetingUpdate$ = new Subject<string[]>();

  contract: ethers.Contract;

  constructor(private ethService: EthService) { }

  async init() {
    if (!this._initialized) {
      this._initialized = true; // no re-entrancy

      const [{ chainId }, signer] = await Promise.all([
        this.ethService.getNetwork(),
        this.ethService.getSigner()
      ]);

      const networks = GreeterContract.networks as any
      const address = networks[chainId]?.address;

      if (address) {
        const contract = new ethers.Contract(
          address,
          GreeterContract.abi,
          signer
        );

        try {
          await contract.deployed(); // control contract is deployed & valid

          this._deployed = true;
          this.contract = contract;

          this.contract.on('GreetingUpdated',
            (_, oldGreeting, greeting) => this._greetingUpdate$.next([oldGreeting, greeting]));

        } catch (err) {
          console.warn(err); // contract not deployed
        }
      }
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
    const tx = this.contract?.setGreeting(message) as Promise<ethers.providers.TransactionResponse>;

    if (tx) {
      return from(tx).pipe(
        take(1),
        switchMap(t => t.wait()),
        map(r => r.status),
      );
    }
    return EMPTY;
  }

  greetingUpdates() {
    return this._greetingUpdate$;
  }

  logs() {
    const filter = this.contract?.filters.GreetingUpdated();
    if (this.contract) {
      return from(this.contract.queryFilter(filter)).pipe(take(1));
    }
    return EMPTY;
  }

  isOwner() {
    if (this.contract) {
      return from(this.contract.owner()).pipe(
        zipWith(from(this.ethService.getAddress())),
        map(v => v[0] === v[1]),
        take(1)
      );
    }
    return EMPTY;
  }

}
