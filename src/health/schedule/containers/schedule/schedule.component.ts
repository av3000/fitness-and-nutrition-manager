import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { ScheduleService } from 'src/health/shared/services/schedule/schedule.service';
import { Store } from 'store';

@Component({
  selector: 'schedule',
  styleUrls: ['./schedule.component.scss'],
  templateUrl: './schedule.component.html',
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$!: Observable<Date>;

  subscriptions: Subscription[] = [];

  constructor(private service: ScheduleService, private store: Store) {}

  ngOnInit() {
    this.date$ = this.store.select('date');

    this.subscriptions = [this.service.schedule$.subscribe()];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
