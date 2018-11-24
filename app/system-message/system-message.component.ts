import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { MessageService } from './message.service';

@Component({
  selector: 'app-system-message',
  templateUrl: './system-message.component.html',
  styleUrls: ['./system-message.component.css']
})
export class SystemMessageComponent implements OnInit {

  constructor(
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  closeMsg(): void {
    console.log(this.messageService.message);
    this.location.back();
  }
}
