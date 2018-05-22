import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { IAppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAuthState } from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  authState: Observable<IAuthState>;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
