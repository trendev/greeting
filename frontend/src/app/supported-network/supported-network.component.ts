import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supported-network',
  templateUrl: './supported-network.component.html',
  styleUrls: ['./supported-network.component.sass']
})
export class SupportedNetworkComponent implements OnInit {

  networks: Network[] = [
    {
      protocol: 'ETH',
      name: 'Goerli',
      testnet: true
    },
    {
      protocol: 'ETH',
      name: 'Rinkeby',
      testnet: true
    },
    {
      protocol: 'ETH',
      name: 'Kovan',
      testnet: true
    },
    {
      protocol: 'ETH',
      name: 'Ropsten',
      testnet: true
    },
    {
      protocol: 'AVALANCHE',
      name: 'Fuji',
      testnet: true
    }
  ];

  ngOnInit() {
    this.networks.sort((n1, n2) => {
      const pDiff = n1.protocol.localeCompare(n2.protocol);
      if (pDiff === 0) {
        return n1.name.localeCompare(n2.name);
      }
      return pDiff;
    });
  }
}

interface Network {
  protocol: string,
  name: string,
  testnet: boolean
}