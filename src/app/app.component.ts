import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBrcQusBGZvN4ooVhALyKTMQKa6YdO8LxE',
      authDomain: 'recipe-book-udemy.firebaseapp.com'
    });
  }

}
