import { Component } from '@angular/core';

@Component({
  selector: 'meal',
  styleUrls: ['meal-item.component.scss'],
  templateUrl: './meal-item.component.html',
})
export class MealItemComponent {
  constructor() {}

  addMeal(event: unknown) {
    console.log('Meal:', event);
  }
}
