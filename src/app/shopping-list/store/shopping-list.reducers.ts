import { Ingredient } from '../../shared/ingredient.model';
import {
  ShoppingListActions,
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  UPDATE_INGREDIENT,
  START_EDIT, STOP_EDIT
} from './shopping-list.actions';

export interface IShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: IShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
  switch (action.type) {

    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };

    case STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case UPDATE_INGREDIENT:
      // Get the updated ingredient, we can also use store.editedIngredient instead of this part
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      // Now that we have the updated ingredient, overwrite it in our ingredients
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default: {
      return state;
    }
  }
}
