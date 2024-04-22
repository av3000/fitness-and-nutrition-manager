import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

import { Store } from 'store';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';

export interface ScheduleItem {
  meals: Meal[] | null;
  workouts: Workout[] | null;
  section: string;
  timestamp: number;
  $key?: string;
}

export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private userSchedulesEndpointAPI = `schedule/${this.uid}`;

  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any[]) => {
      const id = section.data.$key;
      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime(),
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...items,
      };

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    })
  );

  selected$ = this.section$.pipe(tap((val) => this.store.set('selected', val)));
  list$ = this.section$.pipe(
    map((val: any) => this.store.value[val.type]),
    tap((val) => this.store.set('list', val))
  );

  schedule$: Observable<ScheduleItem[]> = this.date$.pipe(
    tap((date) => this.store.set('date', date)),
    map((date) => {
      const startAt = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).getTime();
      const endAt =
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1
        ).getTime() - 1;
      return { startAt, endAt };
    }),
    switchMap(({ startAt, endAt }) => this.getSchedule(startAt, endAt)),
    map((data: any) => {
      const mapped: ScheduleList = {};

      data.forEach((item: any) => {
        const normalizedData = item.payload.val();
        const $key = item.key;
        mapped[normalizedData.section] = { ...normalizedData, $key };
      });

      return mapped;
    }),
    filter((mappedSchedule) => !!mappedSchedule),
    tap((schedule: any) => this.store.set('schedule', schedule))
  );

  get uid(): string | undefined {
    return this.authService.currentUser?.uid;
  }

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  update(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  updateSection(key: string, payload: ScheduleItem) {
    const { $key, ...updatePayload } = payload;
    return this.db
      .list(this.userSchedulesEndpointAPI)
      .update(key, updatePayload);
  }

  createSection(payload: ScheduleItem) {
    return this.db.list(this.userSchedulesEndpointAPI).push(payload);
  }

  getSchedule(startAt: number, endAt: number): any {
    return this.db
      .list(this.userSchedulesEndpointAPI, (queryFn) =>
        queryFn.orderByChild('timestamp').startAt(startAt).endAt(endAt)
      )
      .snapshotChanges();
  }
}
