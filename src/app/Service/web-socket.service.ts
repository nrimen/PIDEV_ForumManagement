import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../Core/Models/ChatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket;
  chatMessages: ChatMessageDto[] = [];

  constructor() { }
  private getWebSocketUrl(options: { protocol: string, hostname: string, port: number, path: string }): string {
    const { protocol, hostname, port, path } = options;
    return `${protocol}://${hostname}:${port}${path}`;
  }
  
  public openWebSocket(){
    
    this.webSocket = new WebSocket('ws://127.0.0.1:8089/ForumManagement/chat');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto){
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}