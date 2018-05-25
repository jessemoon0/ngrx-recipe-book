import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {map, take} from 'rxjs/operators';

import {IAppState} from '../app.reducers';
import {Store} from '@ngrx/store';
import {IAuthState} from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<IAppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .pipe(
        take(1),
        map(
          (authState: IAuthState) => {
            return authState.authenticated;
          }
        )
      );
  }
}
