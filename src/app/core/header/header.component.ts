import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

// NgRx
import { IAppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { FirebaseLogout } from '../../auth/store/auth.actions';
import { IAuthState } from '../../auth/store/auth.reducers';
import { FetchRecipes, StoreRecipes } from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  authState: Observable<IAuthState>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new FirebaseLogout());
  }
}
