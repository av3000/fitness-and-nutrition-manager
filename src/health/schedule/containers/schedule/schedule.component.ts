import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { MealsService } from 'src/health/shared/services/meals/meals.service';

import {
  ScheduleItem,
  ScheduleService,
} from 'src/health/shared/services/schedule/schedule.service';
import { WorkoutsService } from 'src/health/shared/services/workouts/workouts.service';
import { CommonFirebaseInstance } from 'src/health/shared/types';
import { Store } from 'store';

@Component({
  selector: 'schedule',
  styleUrls: ['./schedule.component.scss'],
  templateUrl: './schedule.component.html',
})
export class ScheduleComponent implements OnInit, OnDestroy {
  open = false;

  date$!: Observable<Date>;
  schedule$!: Observable<ScheduleItem[]>;
  selected$!: Observable<any>;
  list$!: Observable<CommonFirebaseInstance[]>;

  subscriptions: Subscription[] = [];

  constructor(
    private service: ScheduleService,
    private store: Store,
    private mealService: MealsService,
    private workoutService: WorkoutsService
  ) {}

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.service.schedule$.subscribe(),
      this.service.selected$.subscribe(),
      this.service.list$.subscribe(),
      this.service.items$.subscribe(),
      this.mealService.meals$.subscribe(),
      this.workoutService.workouts$.subscribe(),
    ];
  }

  changeDate(date: Date) {
    this.service.update(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.service.selectSection(event);
  }

  assignItem(items: string[]) {
    this.service.updateItems(items);
    this.closeAssign();
  }

  closeAssign() {
    this.open = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
