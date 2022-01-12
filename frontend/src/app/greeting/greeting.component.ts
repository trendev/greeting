import { Component, OnInit } from '@angular/core';
import { GreeterContractService } from '../greeter-contract.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.sass']
})
export class GreetingComponent implements OnInit {

  greet: string;

  constructor(private greeterContractService: GreeterContractService) { }

  ngOnInit() {
    this.init();
  }

  private async init() {
    await this.greeterContractService.init();
    this.greet = await this.greeterContractService.greet();
  }

  get isDeployed(): boolean {
    return this.greeterContractService.isDeployed();
  }

  get address(): string {
    return this.greeterContractService.getAddress();
  }

  updateGreeting(message: string) {
    console.log(message);
  }

}
