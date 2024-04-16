import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {NavigationEnd, Router} from "@angular/router";

const config = {
  databaseURL: 'https://chatting-9b8b8-default-rtdb.firebaseio.com',
  apiKey: 'AIzaSyD3TVWd-x2GWXZemFh_yUxiz1lWBi6WqOI',
  authDomain: 'chatting-9b8b8.firebaseapp.com',
  projectId: 'chatting-9b8b8',
  storageBucket: 'chatting-9b8b8.appspot.com',
  messagingSenderId: '1016780165136',
  appId: '1:1016780165136:web:7c3e498356f1a786857a95'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ForumManagement';
  isReserverStandRoute: boolean = false;

  constructor(private router: Router  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isReserverStandRoute = event.url.includes('/ReserverStand');
      }
    });
  }
  ngOnInit() {
    firebase.initializeApp(config);
    // Initialisez Firestore ici si vous en avez besoin
    const firestore = firebase.firestore();
  }
}
