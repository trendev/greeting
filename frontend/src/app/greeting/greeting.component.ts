import { Component, OnInit } from '@angular/core';
import { catchError, finalize, Observable, of } from 'rxjs';
import { GreeterContractService } from '../greeter-contract.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.sass']
})
export class GreetingComponent implements OnInit {

  greet: string;
  greetClass: 'done' | 'pending';
  disabled = false;
  previousGreets: string[] = [];
  isOwner$: Observable<boolean>;

  constructor(private greeterContractService: GreeterContractService) { }

  ngOnInit() {
    this.init();
  }

  private async init() {
    await this.greeterContractService.init();

    this.greet = await this.greeterContractService.greet();
    this.greetClass = 'done';

    this.greeterContractService.greetingUpdates()
      .subscribe(log => {
        this.previousGreets.push(log[0]);
        this.greet = log[1];
      });

    this.greeterContractService.logs()
      .pipe(catchError(e => of([])))
      .subscribe(logs =>
        logs.sort((l1, l2) => l1.blockNumber - l2.blockNumber)
          .forEach(l => this.previousGreets.push(l.args?.oldGreeting)));

    this.isOwner$ = this.greeterContractService.isOwner();
  }

  get isDeployed(): boolean {
    return this.greeterContractService.isDeployed();
  }

  get address(): string {
    return this.greeterContractService.getAddress();
  }

  setGreeting(message: string) {
    this.disabled = true;
    this.greetClass = 'pending';
    this.greeterContractService.setGreeting(message)
      .pipe(
        finalize(() => {
          this.disabled = false;
          this.greetClass = 'done'
        }),
        catchError(e => {
          console.error('setGreeting()', e);
          return of(0);
        }))
      .subscribe(status => this.greet = status ? message : this.greet);
  }

}
