import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Recipe } from '../recipe.model';

// NgRx
import { Store } from '@ngrx/store';
import {IRecipeState, IRecipeStateLazy} from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesState: Observable<IRecipeState>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<IRecipeStateLazy>) {
  }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
