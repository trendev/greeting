import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.sass']
})
export class ThemeSwitchComponent implements OnInit {

  @Input() mode: 'dark_mode' | 'light_mode' = 'light_mode';
  @Output() modeChange = new EventEmitter<'dark_mode' | 'light_mode'>();

  constructor() {
  }

  ngOnInit(): void {
  }

  switchMode() {
    this.mode = this.mode === 'light_mode' ? 'dark_mode' : 'light_mode';
    this.modeChange.emit(this.mode);
  }
}
