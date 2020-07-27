import {Component} from '@angular/core';
import {SocketService} from '../socket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  constructor(public connection: SocketService) {
    connection.connect();
  }
}
