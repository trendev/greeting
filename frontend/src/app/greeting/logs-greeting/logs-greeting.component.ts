import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs-greeting',
  templateUrl: './logs-greeting.component.html',
  styleUrls: ['./logs-greeting.component.sass']
})
export class LogsGreetingComponent implements OnInit {

  @Input() logs: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
