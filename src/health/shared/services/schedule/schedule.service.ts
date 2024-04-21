import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Store } from 'store';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());

  schedule$: Observable<Date> = this.date$.pipe(
    tap((date) => this.store.set('date', date))
  );

  constructor(private store: Store) {}
}
