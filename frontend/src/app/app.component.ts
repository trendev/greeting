import { Component } from '@angular/core';
import { ethers } from 'ethers';

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
    this.provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any');
    // const signer = provider.getSigner();
    if (this.provider) {

      this.provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          console.log(`changing network from ${oldNetwork} to ${newNetwork}`);
          window.location.reload();
        }
      });

      this.fetchData();
    }
  }

  private fetchData() {
    this.blockn = this.provider.getBlockNumber();
    this.network = this.provider.getNetwork();
  }

}
