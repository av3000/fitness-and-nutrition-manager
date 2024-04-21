import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

import { Observable, filter, map, tap, of } from 'rxjs';

import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'store';

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

export interface MealCreateParameters {
  name: string;
  ingredients: string[];
}

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  private userMealsEndpointAPI = `/meals/${this.uid}`;

  mealsTable: AngularFireList<Meal> = this.db.list(this.userMealsEndpointAPI);

  meals$: Observable<Meal[]> = this.db
    .list<Meal>(`${this.userMealsEndpointAPI}`)
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.val();
          return { ...data, $key: a.key } as Meal;
        })
      ),
      tap((meals) => {
        this.store.set('meals', meals);
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

  getOne(key: string): Observable<Meal> {
    if (!key) return of({} as Meal);

    return this.store.select<Meal[]>('meals').pipe(
      filter((meals) => !!meals),
      map((meals) => meals.find((meal) => meal.$key === key) || ({} as Meal))
    );
  }

  create(mealCreateParams: MealCreateParameters) {
    return this.mealsTable.push(mealCreateParams as Meal);
  }

  update(key: string, updatedMeal: Meal) {
    return this.mealsTable.update(key, updatedMeal);
  }

  delete(key: string) {
    return this.mealsTable.remove(key);
  }
}
