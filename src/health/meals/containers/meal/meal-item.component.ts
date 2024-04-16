import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  MealCreateParameters,
  MealsService,
} from 'src/health/shared/services/meals/meals.service';

@Component({
  selector: 'meal',
  styleUrls: ['meal-item.component.scss'],
  templateUrl: './meal-item.component.html',
})
export class MealItemComponent {
  constructor(private service: MealsService, private router: Router) {}

  createMeal(mealCreateParams: MealCreateParameters) {
    this.service.create(mealCreateParams);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['/meals']);
  }
}
