import { Ingredient } from '../../shared/ingredient.model';
import {
  ShoppingListActions,
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  UPDATE_INGREDIENT
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
    case UPDATE_INGREDIENT:
      // Get the updated ingredient
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      // Now that we have the updated ingredient, overwrite it in our ingredients
      const ingredients = [...state.ingredients];
      ingredients[action.payload.index] = updatedIngredient;
      return {
        ...state,
        // ingredients: [...state.ingredients, updatedIngredient]
        ingredients: ingredients
      };
    case DELETE_INGREDIENT:
      const ingredientsBeforeDelete = [...state.ingredients];
      const updatedIngredients = ingredientsBeforeDelete.splice(action.payload, 1);
      return {
        ...state,
        ingredients: updatedIngredients
      };
    default: {
      return state;
    }
  }
}
