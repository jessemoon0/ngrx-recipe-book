import {Action} from '@ngrx/store';

export const BEFORE_SIGNUP = 'BEFORE_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const BEFORE_LOGIN = 'BEFORE_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FIREBASE_LOGOUT = 'FIREBASE_LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const AUTH_FAIL = 'AUTH_FAIL';

// @Effects action to fire the firebase network call
export class BeforeSignUp implements Action {
  readonly type = BEFORE_SIGNUP;
  constructor(public payload: {username: string, password: string}) { }
}

export class SignUp implements Action {
  readonly type = SIGNUP;
}
// @Effects action to fire the firebase network call
export class BeforeLogin implements Action {
  readonly type = BEFORE_LOGIN;
  constructor(public payload: {username: string, password: string}) { }
}

export class Login implements Action {
  readonly type = LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class FirebaseLogout implements Action {
  readonly type = FIREBASE_LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) { }
}

// Display Authentication errors
export class AuthFail implements Action {
  readonly type = AUTH_FAIL;
  constructor(public payload: string) { }
}

export type AuthActions =
  BeforeSignUp |
  SignUp |
  BeforeLogin |
  Login |
  Logout |
  FirebaseLogout |
  SetToken |
  AuthFail;
