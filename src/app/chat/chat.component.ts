import { Component, OnInit } from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {webSocket} from 'rxjs/webSocket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  // private myWebSocket = webSocket('ws://localhost:8000');
  private myWebSocket: WebSocketSubject<any>;

  constructor() { }

  ngOnInit(): void {
  }

  connect() {
    this.myWebSocket = webSocket('ws://localhost:8000');

    this.myWebSocket.subscribe(
      // Called whenever there is a message from the server
      msg => {
        debugger;
        console.log('text received: ' + JSON.stringify(msg));
      },
      // Called whenever there is a message from the server
      err => {
        debugger;
        console.log(err);
      },
      // Called if WebSocket API signals some kind of error
      () => {
        debugger;
        console.log('complete');
      }
      // Called when connection is closed (for whatever reason)
    );
  }

  disconnect() {
    console.log('Disconnected');
    if (this.myWebSocket) {
      this.myWebSocket.complete();
      this.myWebSocket = null;
    }
  }

  sendData() {
    console.log('sent msg');
    this.myWebSocket.next({message: 'some message'});
    //this.myWebSocket.next('message from client');
  }
}
