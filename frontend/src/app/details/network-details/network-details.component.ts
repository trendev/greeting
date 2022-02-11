import { Component, OnInit } from '@angular/core';
import { providers } from 'ethers';
import { EthService } from 'src/app';

@Component({
  selector: 'app-network-details',
  templateUrl: './network-details.component.html',
  styleUrls: ['./network-details.component.sass']
})
export class NetworkDetailsComponent implements OnInit {
  network: providers.Network;

  constructor(private ethService: EthService) { }

  ngOnInit(): void {
    this.ethService.getNetwork().then(net => this.network = net);
  }

  //@TODO : improve with chainName coming from Dialog (select box)
  addEthNetwork(chainName: string = 'Avalanche Testnet C-Chain') {
    this.ethService.addEthNetwork(chainName)
      .catch(console.error);
  }

}
