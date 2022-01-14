import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event } from 'ethers';
import { catchError, finalize, Observable, of } from 'rxjs';
import { GreeterContractService } from '../greeter-contract.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.sass']
})
export class GreetingComponent implements OnInit {

  greet: string;
  disabled = false;
  logs: string[] = [];

  constructor(private greeterContractService: GreeterContractService) { }

  ngOnInit() {
    this.init();
  }

  private async init() {
    await this.greeterContractService.init();

    this.greet = await this.greeterContractService.greet();

    this.greeterContractService.greetingUpdates()
      .subscribe(g => this.greet = g);

    this.greeterContractService.logs()
      .pipe(catchError(e => of([])))
      .subscribe(logs => {
        logs.sort((l1, l2) => l1.blockNumber - l2.blockNumber)
          .forEach(l => this.logs.push(l.args?.oldGreeting));
        console.log(this.logs);
      });
  }

  get isDeployed(): boolean {
    return this.greeterContractService.isDeployed();
  }

  get address(): string {
    return this.greeterContractService.getAddress();
  }

  setGreeting(message: string) {
    this.disabled = true;
    this.greeterContractService.setGreeting(message)
      .pipe(
        finalize(() => this.disabled = false),
        catchError(e => {
          console.error('setGreeting()', e);
          return of(0);
        }))
      .subscribe(status => this.greet = status ? message : this.greet);
  }

}
