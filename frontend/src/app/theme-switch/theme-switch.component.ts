import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.sass']
})
export class ThemeSwitchComponent implements OnInit {

  mode: 'dark_mode' | 'light_mode'
  constructor() {
    this.mode = 'light_mode';
  }

  ngOnInit(): void {
  }

}
