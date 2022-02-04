import { EthService } from './eth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  canFetchData = false;

  constructor(private ethService: EthService) { }

  ngOnInit() {
    this.ethService.isInitialized().then(v => this.canFetchData = v);
  }


}
