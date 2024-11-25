import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

import { User } from './auth/shared/services/auth/auth.service';
import { Meal } from './health/shared/services/meals/meals.service';
import { Workout } from './health/shared/services/workouts/workouts.service';
import { ScheduleItem } from './health/shared/services/schedule/schedule.service';
import { Ingredient } from './health/shared/services/ingredients/ingredients.service';

export interface State {
  user: User | undefined;
  meals: Meal[] | undefined;
  ingredients: Ingredient[] | undefined;
  workouts: Workout[] | undefined;
  list: Meal[] | Workout[] | undefined;
  date: Date | undefined;
  selected: any;
  schedule: ScheduleItem[] | undefined;
  [key: string]: any;
}

const state: State = {
  user: undefined,
  meals: undefined,
  ingredients: undefined,
  workouts: undefined,
  list: undefined,
  date: undefined,
  schedule: undefined,
  selected: undefined,
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(map((state) => state[name]));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
