import { Injectable } from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {map} from 'rxjs/operators';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public client: WebSocketSubject<any>;
  public connectionStatus: Observable<boolean>;
  public connectionStateChange = new Subject();

  constructor() { }

  /**
   * Establishes a web socket connection and subscribes to socket state change
   */
  public connect() {
    // create the rxjs webSocket and subscribe to connect and disconnect state changes
    this.client = webSocket({
      url: 'ws://localhost:8000',
      openObserver: this.connectionStateChange,
      closeObserver: this.connectionStateChange
    });

    // returns true when web socket status is connected (open)
    this.connectionStatus = this.connectionStateChange.pipe(
      map((data: Event) => data.type === 'open')
    );

    this.client.subscribe(
      msg => {
        console.log('text received: ' + JSON.stringify(msg));
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('complete');
      }
    );
  }

  /**
   * Disconnect from the socket service
   */
  public disconnect() {
    if (this.client) {
      this.client.complete();
      this.client = null;
      console.log('Disconnected');
    }
  }

  /**
   * Send data to the socket service
   */
  public sendData() {
    console.log('sent msg');
    this.client.next({message: 'some message'});
  }
}
