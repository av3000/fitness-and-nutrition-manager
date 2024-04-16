import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';

import {
  Meal,
  MealsService,
} from 'src/health/shared/services/meals/meals.service';

@Component({
  selector: 'meals',
  styleUrls: ['./meals.component.scss'],
  templateUrl: './meals.component.html',
})
export class MealsComponent {
  meals$!: Observable<Meal[]>;
  private subs$ = new Subscription();

  constructor(private service: MealsService, private store: Store) {}

  ngOnInit(): void {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.subs$.add(this.service.meals$.subscribe());
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
