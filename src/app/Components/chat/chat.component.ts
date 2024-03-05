import { Component, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Core/Models/user';
import {Stomp} from '@stomp/stompjs';

/*export interface Messaggio {
t_stamp: string;
content: any;
sender: any;
  ms_id: number;
}
export interface ConnectedUser {
  firstName: string;
  fullName: string;
}

@Component({
  selector: 'cf-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit, AfterViewChecked {
  static id1: string = "1";
  static nick1: string = "xx";
  static id2: string = "2";
  static nick2: string = "yy";

  url = 'http://localhost:4200';
  otherUser?: User;
  thisUser: User = JSON.parse(sessionStorage.getItem('user')!);
  channelName?: string;
  socket?: WebSocket;
  stompClient?:any;
  newMessage = new FormControl('');
  messages?: Observable<Array<Messaggio>>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private el: ElementRef) {}

  ngOnInit(): void {
    this.connectToChat();
    console.log(this.el);
    this.el.nativeElement.querySelector("#chat").scrollIntoView();
  }

  ngAfterViewChecked(): void {
    this.scrollDown();
  }

  scrollDown(): void {
    const container = this.el.nativeElement.querySelector("#chat");
    container.scrollTop = container.scrollHeight;
  }

  connectToChat(): void {
    if (ChatComponent.id1 > ChatComponent.id2) {
      this.channelName = ChatComponent.nick1 + '&' + ChatComponent.nick2;
    } else {
      this.channelName = ChatComponent.nick2 + '&' + ChatComponent.nick1;
    }
    this.loadChat();
    console.log('connecting to chat...');
    this.socket = new SockJS(this.url + '/chat');
    this.stompClient = Stomp.over(this.socket);

    this.stompClient?.connect({}, (frame: any) => {
      console.log('connected to: ' + frame);
      this.stompClient!.subscribe(
        '/topic/messages/' + this.channelName,
        (response: any) => {
          this.loadChat();
        }
      );
    });
  }

  sendMsg(): void {
    if (this.newMessage.value !== '') {
      this.stompClient!.send(
        '/app/chat/' + this.channelName,
        {},
        JSON.stringify({
          sender: this.thisUser.firstName,
          t_stamp: 'to be defined in server',
          content: this.newMessage.value,
        })
      );
      this.newMessage.setValue('');
    }
  }

  loadChat(): void {
    this.messages = this.http.post<Array<Messaggio>>(this.url + '/getMessages', this.channelName);
    this.messages.subscribe(data => {
      const mgs: Array<Messaggio> = data;
      mgs.sort((a, b) => (a.ms_id > b.ms_id) ? 1 : -1);
      this.messages = of(mgs);
    });
    console.log(this.messages);
  }

  whenWasItPublished(myTimeStamp: string): string {
    const endDate = myTimeStamp.indexOf('-');
    return (
      myTimeStamp.substring(0, endDate) +
      ' at ' +
      myTimeStamp.substring(endDate + 1)
    );
  }*/

