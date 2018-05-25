import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';

import { Recipe } from '../recipe.model';

import {Action, Store} from '@ngrx/store';
import {FETCH_RECIPES, FetchRecipes, SET_RECIPES, STORE_RECIPES} from './recipe.actions';
import {IRecipeStateLazy} from './recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes: Observable<Action> = this.actions$.ofType(FETCH_RECIPES)
    .pipe(
      switchMap(
        (action: FetchRecipes) => {
          return this.httpClient.get<Recipe[]>(
            'https://recipe-book-udemy.firebaseio.com/recipes.json',
            {
              observe: 'body',
              responseType: 'json'
            })
            .pipe(
              map(
                (recipes) => {
                  console.log(recipes);
                  recipes = recipes || []; // handle 'null' case
                  for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                      recipe['ingredients'] = [];
                    }
                  }
                  return {
                    type: SET_RECIPES,
                    payload: recipes
                  };
                }
              )
            );
        }
      )
    );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.ofType(STORE_RECIPES)
    .pipe(
      // We are combining a store state (recipes) with the http call
      withLatestFrom(this.store.select('recipes')),
      // Instead of a single result of type action, we get an array
      // with the action and also the recipes state
      switchMap(([action, recipeState]) => {
        const req = new HttpRequest(
          'PUT',
          'https://recipe-book-udemy.firebaseio.com/recipes.json',
          recipeState.recipes,
          {reportProgress: true});
        return this.httpClient.request(req);
      })
    );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<IRecipeStateLazy>
  ) { }
}
