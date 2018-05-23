import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

// NgRx
import {IAppState} from '../../app.reducers';
import {Store} from '@ngrx/store';
import {BeforeLogin} from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private store: Store<IAppState>) { }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new BeforeLogin({username: email, password}));
  }

}
