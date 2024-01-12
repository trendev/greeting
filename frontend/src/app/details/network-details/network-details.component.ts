import { Component, OnInit } from '@angular/core';
import { providers } from 'ethers';
import { EthService } from 'src/app'; ``
import { MatDialog } from '@angular/material/dialog';
import { DialogSelectEthNetworkComponent } from './dialog-select-eth-network/dialog-select-eth-network.component';

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

  addEthNetwork() {
    const dialogRef = this.dialog.open(DialogSelectEthNetworkComponent, {
      width: '350px',
      data: { networks: this.ethService.getCustomNetworksNames() },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ethService.addEthNetwork(result)
          .catch(console.error);
      }
    });

  }

}
