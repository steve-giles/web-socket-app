import {Component} from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {webSocket} from 'rxjs/webSocket';
import {Observable, of, Subject} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  public myWebSocket: WebSocketSubject<any>;
  public connectionStatus: Observable<boolean>;
  public connectionStatusClosed: Observable<boolean>;
  public connectionOpened = new Subject();
  public connectionClosed = new Subject<CloseEvent>();

  public connectionStateChange = new Subject();

  constructor() {
    // /// connection status
    // this.connectionStatus = new Observable((observer) => {
    //   this.connectionObserver = observer;
    // }).share().distinctUntilChanged();
  }

  /**
   * Connect to the socket service
   */
  connect() {

    // this.myWebSocket = webSocket({
    //   url: 'ws://localhost:8000',
    //   closeObserver: this.closeSubject,
    //   openObserver: {
    //     next: () => console.log('Underlying WebSocket connection open')
    //   }
    // });

    // this.myWebSocket = webSocket({
    //   url: 'ws://localhost:8000',
    //   openObserver: {
    //     next: () => {
    //       console.log('connetion ok');
    //     }
    //   },
    //   // closeObserver: {
    //   //   next: () => {
    //   //     console.log('connetion close');
    //   //   }
    //   // }
    // });

    // create the rxjs webSocket and subscribe to connect and disconnect state changes
    this.myWebSocket = webSocket({
      url: 'ws://localhost:8000',
      openObserver: this.connectionStateChange,
      closeObserver: this.connectionStateChange
    });

    // returns true when web socket status is connected (open)
    this.connectionStatus = this.connectionStateChange.pipe(
      map((data: Event) => {
        return data.type === 'open';
      })
    );

    // this.myWebSocket = webSocket({
    //   url: 'ws://localhost:8000',
    //   openObserver: this.connectionOpened,
    //   closeObserver: this.connectionClosed
    // });

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

    // // this.connectionOpened.subscribe(data => {
    // //   debugger;
    // //   });
    // //
    // // this.connectionClosed.subscribe(data => {
    // //   debugger;
    // // });
    //
    // this.connectionStatus = this.connectionOpened.pipe(
    //   map(data => {
    //     //debugger;
    //     console.log(data);
    //     return true;
    //   })
    // );
    //
    // this.connectionStatusClosed = this.connectionClosed.pipe(
    //   map(data => {
    //     //debugger;
    //     console.log(data);
    //     return true;
    //   })
    // );
    //
    // // const x = this.connectionClosed.pipe(
    // //   mergeMap(data => {
    // //     debugger;
    // //     console.log(data);
    // //
    // //     return this.connectionOpened;
    // //     //return true;
    // //   })
    // // ).subscribe(result => {
    // //   debugger;
    // // });
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
