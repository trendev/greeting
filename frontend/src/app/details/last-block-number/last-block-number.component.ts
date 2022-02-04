import { Component, OnInit } from '@angular/core';
import { EthService } from 'src/app';

@Component({
  selector: 'app-last-block-number',
  templateUrl: './last-block-number.component.html',
  styleUrls: ['./last-block-number.component.sass']
})
export class LastBlockNumberComponent implements OnInit {
  block: number;

  constructor(private ethService: EthService) { }

  ngOnInit(): void {
    this.ethService.getBlockNumber().then(b => this.block = b);
  }

}
