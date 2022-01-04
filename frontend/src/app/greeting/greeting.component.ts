import { Component, Input, OnInit } from '@angular/core';
import { ethers } from 'ethers';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.sass']
})
export class GreetingComponent implements OnInit {

  @Input() greeting = '';
  @Input() instance!: ethers.Contract;

  constructor() { }

  ngOnInit(): void {
  }

  get address(): string {
    return this.instance.address;
  }

}
