import { Component, OnInit } from '@angular/core';
import { providers } from 'ethers';
import { EthService } from 'src/app'; ``
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-network-details',
  templateUrl: './network-details.component.html',
  styleUrls: ['./network-details.component.sass']
})
export class NetworkDetailsComponent implements OnInit {
  network: providers.Network;

  constructor(private ethService: EthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ethService.getNetwork().then(net => this.network = net);
  }

  addEthNetwork(chainName: string = 'Avalanche Testnet C-Chain') {
    this.ethService.addEthNetwork(chainName)
      .catch(console.error);
  }

}
