import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import {IAppState} from '../app.reducers';
import {Store} from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';

import {IAuthState} from '../auth/store/auth.reducers';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<IAppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);

    // store.select sets an ongoing subscription, that's why we use take(1)
    return this.store.select('auth')
      .pipe(
        take(1),
        switchMap(
          (authState: IAuthState) => {
            const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
            return next.handle(copiedReq);
          }
        )
      );
    // return null;
  }
}
