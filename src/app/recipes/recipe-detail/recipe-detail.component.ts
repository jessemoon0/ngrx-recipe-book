import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// Observables
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

// NgRx
import { Store } from '@ngrx/store';
import { AddIngredients } from '../../shopping-list/store/shopping-list.actions';
import { IRecipeState, IRecipeStateLazy } from '../store/recipe.reducers';
import { DeleteRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipesState: Observable<IRecipeState>;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<IRecipeStateLazy>
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipesState = this.store.select('recipes');
        }
      );
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .pipe(
        take(1)
      )
      .subscribe(
        (recipeState: IRecipeState) => {
          this.store.dispatch(new AddIngredients(recipeState.recipes[this.id].ingredients));
        }
      );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
