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
  connecteds = '';
  socketId = '';
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
      .getMessages()
      .subscribe((msg: string) => {
        console.log('msg: ', msg);
        const msgSplit = msg.split('|');
        let message = '';
        if (msgSplit.length === 1) {
          this.socketId = 'pendiente';
          message = msgSplit[0];
        } else {
          this.socketId = msgSplit[0];
          message = msgSplit[1];
        }
        const currentTime = moment().format('hh:mm:ss a');
        const messageWithTimestamp = `${currentTime} - ${this.socketId}: ${message}`;
        this.messages.push(messageWithTimestamp);
        if (!this.connecteds.includes(this.socketId)) {
          this.connecteds += this.socketId + ' ';
        }
      });
  }
  sendMessage() {
    this.chatService
      .sendMessage(this.message);
    this.message = '';
  }
}
