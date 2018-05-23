import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

// NgRx
import { IAppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { BeforeSignUp } from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private store: Store<IAppState>) { }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new BeforeSignUp({username: email, password}));
  }

}
