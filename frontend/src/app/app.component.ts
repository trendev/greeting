import { EthService } from './eth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  canFetchData = false;

  constructor(private ethService: EthService, @Inject(DOCUMENT) private document: Document) {
    this.document.documentElement.classList.add('dark-theme', 'mat-app-background');
  }

  ngOnInit() {
    this.ethService.isInitialized().then(v => this.canFetchData = v);
  }


}
