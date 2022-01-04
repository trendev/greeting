import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-update-greeting',
  templateUrl: './update-greeting.component.html',
  styleUrls: ['./update-greeting.component.sass']
})
export class UpdateGreetingComponent implements OnInit {

  @Output() message = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  updateGreeting(message: string) {
    const m = message.trim();
    if (m) {
      this.message.emit(m);
    }
  }

}
