import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { DatePipe } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const snapshotToArray = <T>(snapshot: firebase.database.DataSnapshot, keyProp: keyof T): T[] => {
  const returnArr: T[] = [];

  snapshot.forEach((childSnapshot: firebase.database.DataSnapshot) => {
    const item = childSnapshot.val() as T;
    returnArr.push({ ...item, [keyProp]: childSnapshot.key });
  });

  return returnArr;
};

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  @ViewChild('chatcontent', { static: false }) chatcontent!: ElementRef;
  scrolltop: number | null = null;

  chatForm!: FormGroup;
  nickname = '';
  roomname = '';
  message = '';
  users: any[] = [];
  chats: any[] = [];
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe
  ) {

  
    this.nickname = localStorage.getItem('nickname') || '';
    this.roomname = this.route.snapshot.params['roomname'];

    firebase.database().ref('chats/').on('value', (resp:any) => {
      this.chats = [];
      this.chats = snapshotToArray(resp, 'key');
      setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
    });

    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp2:any) => {
      const roomusers = snapshotToArray<any>(resp2, 'key');
      this.users = roomusers.filter((x) => x.status === 'online');
    });


  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      'message' : [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    const chat = form;
    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      'message' : [null, Validators.required]
    });
  }

  exitChat() {
    const chat = {
      roomname: '',
      nickname: '',
      message: '',
      date: '',
      type: ''
    };
  
    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss') || '';
    chat.message = `${this.nickname} left the room`;
    chat.type = 'exit';
  
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
  
    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).once('value', (resp:any) => {
      const roomusers = snapshotToArray<any>(resp, 'key'); // Update the type argument to include 'nickname'
      const user = roomusers.find((x) => x.nickname === this.nickname);
      if (user !== undefined) {
        const userRef = firebase.database().ref('roomusers/' + user.key);
        userRef.update({ status: 'offline' });
      }
    });
  
    this.router.navigate(['/roomlist']);
  }
}
