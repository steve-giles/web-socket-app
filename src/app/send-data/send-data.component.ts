import { Component, OnInit } from '@angular/core';
import {webSocket} from 'rxjs/webSocket';

@Component({
  selector: 'app-send-data',
  templateUrl: './send-data.component.html',
  styleUrls: ['./send-data.component.css']
})
export class SendDataComponent implements OnInit {
  private myWebSocket = webSocket('ws://localhost:8000');

  constructor() { }

  ngOnInit(): void {

  }

  sendData() {
    this.myWebSocket.next({message: 'some message'});
  }
}
