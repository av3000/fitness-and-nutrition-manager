import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

import { Observable, filter, map, tap, of } from 'rxjs';

import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'store';
import { CommonFirebaseInstance } from '../../types';

export interface Ingredient
  extends CommonFirebaseInstance,
    IngredientProperties {}

type MacroElementTitle = 'carbohydrates' | 'proteins' | 'fats' | 'fiber';

interface MacroElement {
  title: MacroElementTitle;
  amount: number;
}

export interface IngredientProperties {
  name: string;
  calorie: number;
  description: string;
  macroelements: MacroElement[];
}

export interface IngredientCreateParameters
  extends IngredientProperties,
    Pick<CommonFirebaseInstance, 'name'> {}

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private userIngredientsEndpointAPI = `/ingredients/${this.uid}`;

  ingredientsTable: AngularFireList<Ingredient> = this.db.list(
    this.userIngredientsEndpointAPI
  );

  ingredients$: Observable<Ingredient[]> = this.db
    .list<Ingredient>(`${this.userIngredientsEndpointAPI}`)
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.val();
          return { ...data, $key: a.key } as Ingredient;
        })
      ),
      tap((ingredients) => {
        this.store.set('ingredients', ingredients);
      })
    );

  get uid(): string | undefined {
    return this.authService.currentUser?.uid;
  }

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  // TODO: implement remaining methods with latest AngularFire API
  getOne(key: string): Observable<Ingredient> {
    if (!key) return of({} as Ingredient);

    return this.store.select<Ingredient[]>('ingredients').pipe(
      filter((ingredients) => !!ingredients),
      map(
        (ingredients) =>
          ingredients.find((ingredient) => ingredient.$key === key) ||
          ({} as Ingredient)
      )
    );
  }

  create(ingredientCreateParams: IngredientCreateParameters) {
    return this.ingredientsTable.push(ingredientCreateParams as Ingredient);
  }

  update(key: string, updatedIngredient: Ingredient) {
    return this.ingredientsTable.update(key, updatedIngredient);
  }

  delete(key: string) {
    return this.ingredientsTable.remove(key);
  }
}
