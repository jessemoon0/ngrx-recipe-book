import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';


import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    const req = new HttpRequest(
      'PUT',
      'https://recipe-book-udemy.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {reportProgress: true});
    return this.httpClient.request(req);
  }

  getRecipes() {
    this.httpClient.get<Recipe[]>(
      'https://recipe-book-udemy.firebaseio.com/recipes.json',
      {
      observe: 'body',
      responseType: 'json'
    }).pipe(
        map(
          (recipes) => {
            console.log(recipes);
            for (const recipe of recipes) {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
            return recipes;
          }
        )
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
