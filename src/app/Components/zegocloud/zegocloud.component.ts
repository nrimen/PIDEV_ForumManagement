import { Component, ElementRef, ViewChild } from '@angular/core';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len:number) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}


@Component({
  selector: 'app-zegocloud',
  templateUrl: './zegocloud.component.html',
  styleUrls: ['./zegocloud.component.css']
})
export class ZegocloudComponent {
  @ViewChild('root')
  root!: ElementRef;

  ngAfterViewInit() {
      const roomID = getUrlParams().get('roomID') || randomID(5);
      const userID = Math.floor(Math.random() * 10000) + "";
      const userName = "userName" + userID;

     // generate Kit Token
      const appID = 1860619454 ;
      const serverSecret = "4e7209aa2be67e3f9f7a545d86874ab6";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), userName );

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Start a call.
      zp.joinRoom({
        container: this.root.nativeElement,
        sharedLinks: [
          {
            name: 'Room link',
            url:
            window.location.protocol + '//' + 
            window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
        
      });
  }
}
