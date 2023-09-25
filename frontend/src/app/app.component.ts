import { ThemeMode } from './theme-switch/theme-switch.component';
import { EthService } from './eth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const KEY_MODE = btoa('trendev-app-theme-mode');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  canFetchData = false;
  mode: ThemeMode;

  constructor(private ethService: EthService, @Inject(DOCUMENT) private document: Document) {
    this.mode = localStorage.getItem(KEY_MODE) as ThemeMode || ThemeMode.Dark;
    this.enableMode(this.mode);
  }

  ngOnInit() {
    this.ethService.isInitialized().then(v => this.canFetchData = v);
  }

  enableMode(mode: ThemeMode) {
    this.mode = mode;
    localStorage.setItem(KEY_MODE, mode); //store theme mode in local storage

    switch (mode) {
      case ThemeMode.Dark: {
        this.document.documentElement.classList.add('dark-theme', 'mat-app-background');
        break;
      }
      case ThemeMode.Light: {
        this.document.documentElement.classList.remove('dark-theme', 'mat-app-background');
        break;
      }
    }
  }


}
