import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// NgRx
import { Store } from '@ngrx/store';
import { IAppState } from '../app.reducers';
import {StartEdit} from './store/shopping-list.actions';
import {IShoppingListState} from './store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<IShoppingListState>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
