import * as moment from 'moment';
import { distinctUntilChanged, filter, throttleTime, skipWhile, scan } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'node_chat_client';
  message: string;
  messages: string[];
  secretCode: string;
  constructor(private chatService: ChatService) {
    this.secretCode = 'secret';
    this.messages = [];
    this.message = '';
  }
  ngOnInit() {
    this.chatService
      .getMessages();
  }
  sendMessage() {
    this.chatService.sendMessage(this.message);
    const currentTime = moment().format('hh-mm:ss a');
    const msgWithTimeStamp = `${currentTime}: ${this.message}`;
    this.messages
      .push(msgWithTimeStamp);
    this.message = '';
  }
}
