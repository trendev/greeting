import { Component, Input, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { GreeterContractService } from '../greeter-contract.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.sass']
})
export class GreetingComponent implements OnInit {

  constructor(private greeterContractService: GreeterContractService) { }

  ngOnInit() {
    this.greeterContractService.init();
  }

  get isDeployed(): boolean {
    return this.greeterContractService.isDeployed();
  }

  get address(): string {
    return this.greeterContractService.getAddress();
  }

  get greeting(): string {
    return this.greeterContractService.greet();
  }

  updateGreeting(message: string) {
    console.log(message);
  }

}
