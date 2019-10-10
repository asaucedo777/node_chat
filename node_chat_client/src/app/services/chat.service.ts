import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
  private url = 'http://localhost:3000';
  private socketIoClient;
  constructor() {
    this.socketIoClient = io(this.url);
  }
  public sendMessage(message: string) {
    this.socketIoClient
      .emit('new-message', message);
  }
  public getMessages = () => {
    return Observable.create((observer) => {
      this.socketIoClient
        .on('new-message', (message: string) => {
          observer.next(message);
        });
    });
  }
}
