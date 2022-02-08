import { EthService } from './eth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  canFetchData = false;
  mode: 'dark_mode' | 'light_mode' = 'light_mode';

  constructor(private ethService: EthService, @Inject(DOCUMENT) private document: Document) {
    this.switchMode(this.mode);
  }

  ngOnInit() {
    this.ethService.isInitialized().then(v => this.canFetchData = v);
  }

  switchMode(mode: 'dark_mode' | 'light_mode') {
    this.mode = mode;

    switch (mode) {
      case 'dark_mode': {
        this.document.documentElement.classList.add('dark-theme', 'mat-app-background');
        break;
      }
      case 'light_mode': {
        this.document.documentElement.classList.remove('dark-theme', 'mat-app-background');

        break;
      }
      default:
        throw new Error(`Unsupported switch mode : ${mode}`);
    }
  }


}
