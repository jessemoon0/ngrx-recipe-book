import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  AUTH_FAIL,
  BEFORE_LOGIN,
  BEFORE_SIGNUP,
  BeforeLogin,
  BeforeSignUp,
  FIREBASE_LOGOUT,
  LOGIN,
  LOGOUT,
  SET_TOKEN,
  SIGNUP
} from './auth.actions';
import {Router} from '@angular/router';

import * as firebase from 'firebase';

import {Observable, of} from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp: Observable<Action> = this.actions$.ofType(BEFORE_SIGNUP)
  .pipe(
    // Return only the payload of the action
    map((action: BeforeSignUp) => {
        return action.payload;
    }),
    // Trigger the firebase call. @Effects expects an observable to be returned, that's why we use fromPromise
    switchMap((authData: {username: string, password: string}) => {
      return fromPromise(
        firebase.auth().createUserWithEmailAndPassword(
          authData.username, authData.password
        )
      ).pipe(
        // Once the call is successful, send the network call to get the token
        switchMap(() => {
          return fromPromise(firebase.auth().currentUser.getIdToken());
        }),
        // We use mergeMap to execute 2 actions in 1
        mergeMap((token: string) => {
          this.router.navigate(['/']);
          return [
            {
              type: SIGNUP
            },
            {
              type: SET_TOKEN,
              payload: token
            }
          ];
        }),
        catchError(err => {
          return of({ type: AUTH_FAIL, payload: err });
        })
      );
    })
  );

  @Effect()
  authLogin: Observable<Action> = this.actions$.ofType(BEFORE_LOGIN)
    .pipe(
      // Return only the payload of the action
      map((action: BeforeLogin) => {
        return action.payload;
      }),
      // Trigger the firebase call. @Effects expects an observable to be returned,
      // that's why we use fromPromise
      switchMap((authData: {username: string, password: string}) => {
        return fromPromise(
          firebase.auth().signInWithEmailAndPassword(
            authData.username, authData.password
          )
        ).pipe(
          // Once the call is successful, send the network call to get the token
          switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
          }),
          // We use mergeMap to execute 2 actions in 1
          mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
              {
                type: LOGIN
              },
              {
                type: SET_TOKEN,
                payload: token
              }
            ];
          }),
          catchError(err => {
            console.log('Error', err);
            return of({ type: AUTH_FAIL, payload: err });
          })
        );
      })
    );

  // We could have also done {dispatch: false} and listen for LOGOUT
  // Then we chain tap operator so we can keep our observable structure
  @Effect()
  logout: Observable<Action> = this.actions$.ofType(FIREBASE_LOGOUT)
    .pipe(
      switchMap(() => {
        return fromPromise(firebase.auth().signOut())
          .pipe(
            map(() => {
              this.router.navigate(['/signin']);
              return {
                type: LOGOUT
              };
            }),
            catchError(err => {
              console.log('Error', err);
              return of({ type: AUTH_FAIL, payload: err });
            })
          );
      })
    );
  constructor(private actions$: Actions, private router: Router) { }
}
