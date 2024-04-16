import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

import { Observable, tap } from 'rxjs';

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
    .valueChanges()
    .pipe(tap((meals) => this.store.set('meals', meals)));

  get uid(): string | undefined {
    return this.authService.currentUser?.uid;
  }

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  // TODO: implement remaining methods with latest AngularFire API

  getAll(): AngularFireList<Meal> {
    // TODO: implement this method to retrieve all meals into meals list component
    return this.mealsTable;
  }

  create(mealCreateParams: MealCreateParameters) {
    return this.mealsTable.push(mealCreateParams as Meal);
  }
}
