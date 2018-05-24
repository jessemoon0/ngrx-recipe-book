import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { IAppState } from '../../app.reducers';
import {ADD_RECIPE, DELETE_RECIPE, RecipeActions, SET_RECIPES, UPDATE_RECIPE} from './recipe.actions';

// IRecipeStateLazy is going to be used when we inject the store into components
export interface IRecipeStateLazy extends IAppState {
  recipes: IRecipeState;
}

export interface IRecipeState  {
  recipes: Recipe[];
}

const initialState: IRecipeState = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case UPDATE_RECIPE:
      const recipeToUpdate = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipeToUpdate,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes
      };
    case DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default: {
      return state;
    }
  }
}
