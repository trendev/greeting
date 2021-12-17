import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  greeting = 'hello world 😘';
  blockn = 0;
  network: any;

  ngOnInit() {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    // const signer = provider.getSigner();
    if (provider) {
      from(provider.getBlockNumber()).subscribe(v => this.blockn = v);
      from(provider.getNetwork()).subscribe(v => this.network = JSON.stringify(v, null, 2));
    }

  }

}
