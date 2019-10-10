import * as io from 'socket.io-client';
import { Observable, Observer } from 'rxjs';

export class ChatService {
  private url = 'http://localhost:3000';
  private socketIoClient: SocketIOClient.Socket;
  constructor() {
    this.socketIoClient = io(this.url);
  }
  public getSocketId(): string {
    return this.socketIoClient.id;
  }
  public sendMessage(message: string) {
    this.socketIoClient
      .emit('new-message', message);
  }
  public getMessages = () => {
    return Observable.create((observer: Observer<string>) => {
      this.socketIoClient
        .on('new-message', (message: string) => {
          observer.next(message);
        });
    });
  }
}
