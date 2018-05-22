import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import {IAppState} from '../app.reducers';
import {Store} from '@ngrx/store';
import {Login, Logout, SetToken, SignUp} from './store/auth.actions';

@Injectable()
export class AuthService {

  constructor(private router: Router, private store: Store<IAppState>) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.store.dispatch(new SignUp());
          this.getToken();
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.store.dispatch(new Login());
          this.router.navigate(['/']);
          this.getToken();
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new Logout());
  }

  private getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.store.dispatch(new SetToken(token));
        }
      );
  }
}
