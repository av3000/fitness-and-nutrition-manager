import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

import { Observable, filter, map, tap, of } from 'rxjs';

import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'store';

export interface Workout {
  name: string;
  type: string;
  strength: any;
  endurance: any;
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

export interface WorkoutCreateParameters {
  name: string;
  type: string;
  strength: any;
  endurance: any;
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  private userWorkoutsEndpointAPI = `/workouts/${this.uid}`;

  workoutsTable: AngularFireList<Workout> = this.db.list(
    this.userWorkoutsEndpointAPI
  );

  workouts$: Observable<Workout[]> = this.db
    .list<Workout>(`${this.userWorkoutsEndpointAPI}`)
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.val();
          return { ...data, $key: a.key } as Workout;
        })
      ),
      tap((workouts) => {
        this.store.set('workouts', workouts);
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

  getOne(key: string): Observable<Workout> {
    if (!key) return of({} as Workout);

    return this.store.select<Workout[]>('workouts').pipe(
      filter((workouts) => !!workouts),
      map(
        (workouts) =>
          workouts.find((workout) => workout.$key === key) || ({} as Workout)
      )
    );
  }

  create(workoutCreateParams: WorkoutCreateParameters) {
    return this.workoutsTable.push(workoutCreateParams as Workout);
  }

  update(key: string, updatedWorkout: Workout) {
    return this.workoutsTable.update(key, updatedWorkout);
  }

  delete(key: string) {
    return this.workoutsTable.remove(key);
  }
}
