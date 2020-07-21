import { Component, OnInit } from '@angular/core';
import {webSocket} from 'rxjs/webSocket';

@Component({
  selector: 'app-receive-data',
  templateUrl: './receive-data.component.html',
  styleUrls: ['./receive-data.component.css']
})
export class ReceiveDataComponent implements OnInit {
  //webSockt: WebSocket;
  private webSockt = webSocket('ws://localhost:8000');

  public message: any;

  constructor() { }

  ngOnInit(): void {
    this.webSockt.subscribe(
      msg => {
        console.log('message received: ' + msg);
        this.message = msg;
        }, // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );

    // this.webSockt = new WebSocket('ws://localhost:8000');
    //
    // this.webSockt.onopen = (event) => {
    //   console.log('onopen: ' + event);
    // };
    //
    // this.webSockt.onmessage = (event) => {
    //   console.log('onmessage: ' + event);
    // };
    //
    // this.webSockt.onerror = (event) => {
    //   console.log('error connecting: ' + event);
    // };
  }

}
