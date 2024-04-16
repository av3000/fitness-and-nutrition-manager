import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

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
  meals$: Observable<Meal[]> = this.db
    .list<Meal>(`meals/${this.uid}`)
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
}
