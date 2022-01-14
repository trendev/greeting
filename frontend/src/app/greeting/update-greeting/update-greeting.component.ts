import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-update-greeting',
  templateUrl: './update-greeting.component.html',
  styleUrls: ['./update-greeting.component.sass']
})
export class UpdateGreetingComponent implements OnInit {

  @Output() message = new EventEmitter<string>();
  @Input() disabled: boolean = true;

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
