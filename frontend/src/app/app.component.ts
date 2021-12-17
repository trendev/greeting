import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  greeting = 'hello world 😘';
  blockn: Promise<number>;
  network: Promise<ethers.providers.Network>;
  provider: ethers.providers.Web3Provider;

  constructor() {
    this.provider = new ethers.providers.Web3Provider((window as any).ethereum);
    // const signer = provider.getSigner();
    if (this.provider) {
      this.fetchData();
    }
  }

  private async fetchData() {
    this.blockn = this.provider.getBlockNumber();
    this.network = this.provider.getNetwork();
  }

}
