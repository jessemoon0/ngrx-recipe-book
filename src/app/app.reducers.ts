import { IShoppingListState } from './shopping-list/store/shopping-list.reducers';
import { IAuthState } from './auth/store/auth.reducers';

export interface IAppState {
  shoppingList: IShoppingListState;
  auth: IAuthState;
}
