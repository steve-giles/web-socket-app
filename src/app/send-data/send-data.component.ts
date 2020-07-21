import { Component, OnInit } from '@angular/core';
import {webSocket} from 'rxjs/webSocket';

@Component({
  selector: 'app-send-data',
  templateUrl: './send-data.component.html',
  styleUrls: ['./send-data.component.css']
})
export class SendDataComponent implements OnInit {
  p//rivate myWebSocket = webSocket('ws://127.0.0.1:8080');

  constructor() { }

  ngOnInit(): void {
    //this.myWebSocket.next({message: 'some message'});
  }

}
