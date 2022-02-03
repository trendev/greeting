import { Component, OnInit } from '@angular/core';
import { EthService } from 'src/app';

@Component({
  selector: 'app-eth-address',
  templateUrl: './eth-address.component.html',
  styleUrls: ['./eth-address.component.sass']
})
export class EthAddressComponent implements OnInit {
  address: string;

  constructor(private ethService: EthService) { }

  ngOnInit(): void {
    this.ethService.getAddress().then(a => this.address = a);
  }

}
