import {Component} from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {webSocket} from 'rxjs/webSocket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  private myWebSocket: WebSocketSubject<any>;

  constructor() { }

  /**
   * Connect to the socket service
   */
  connect() {
    this.myWebSocket = webSocket('ws://localhost:8000');

    this.myWebSocket.subscribe(
      // Called whenever there is a message from the server
      msg => {
        console.log('text received: ' + JSON.stringify(msg));
      },
      // Called whenever there is a message from the server
      err => {
        console.log(err);
      },
      // Called if WebSocket API signals some kind of error
      () => {
        console.log('complete');
      }
    );
  }

  /**
   * Disconnect from the socket service
   */
  disconnect() {
    if (this.myWebSocket) {
      this.myWebSocket.complete();
      this.myWebSocket = null;
      console.log('Disconnected');
    }
  }

  /**
   * Send data to the socket service
   */
  sendData() {
    console.log('sent msg');
    this.myWebSocket.next({message: 'some message'});
  }
}
