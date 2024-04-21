import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import {
  Meal,
  MealCreateParameters,
  MealsService,
} from 'src/health/shared/services/meals/meals.service';

@Component({
  selector: 'meal',
  styleUrls: ['meal-item.component.scss'],
  templateUrl: './meal-item.component.html',
})
export class MealItemComponent {
  private subs$ = new Subscription();
  meal$: Observable<Meal | null> | undefined;

  constructor(
    private service: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs$.add(this.service.meals$.subscribe());
    this.meal$ = this.route.params.pipe(
      switchMap((param) => this.service.getOne(param['id']))
    );
  }

  createMeal(mealCreateParams: MealCreateParameters) {
    this.service.create(mealCreateParams);
    this.backToMeals();
  }

  updateMeal(updatedMeal: Meal) {
    const key = this.route.snapshot.params['id'];
    this.service.update(key, updatedMeal);
    this.backToMeals();
  }

  removeMeal(event: string) {
    const key = this.route.snapshot.params['id'];
    this.service.delete(key);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['/meals']);
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
