import { EthService } from './eth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const KEY_MODE = '_mode_';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  canFetchData = false;
  mode: 'dark_mode' | 'light_mode';

  constructor(private ethService: EthService, @Inject(DOCUMENT) private document: Document) {
    this.mode = localStorage.getItem(KEY_MODE) as 'dark_mode' | 'light_mode' || 'light_mode'; // default is light_mode
    this.switchMode(this.mode);
  }

  ngOnInit() {
    this.ethService.isInitialized().then(v => this.canFetchData = v);
  }

  switchMode(mode: 'dark_mode' | 'light_mode') {
    this.mode = mode;
    localStorage.setItem(KEY_MODE, mode); //store theme mode in local storage

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
