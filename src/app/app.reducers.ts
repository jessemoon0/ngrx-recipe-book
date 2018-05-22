import {IShoppingListState, shoppingListReducer} from './shopping-list/store/shopping-list.reducers';
import {authReducer, IAuthState} from './auth/store/auth.reducers';
import { ActionReducerMap} from '@ngrx/store';

export interface IAppState {
  shoppingList: IShoppingListState;
  auth: IAuthState;
}

export const reducers: ActionReducerMap<IAppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer
};
