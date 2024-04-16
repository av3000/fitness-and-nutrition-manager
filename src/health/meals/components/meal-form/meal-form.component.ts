import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { MealCreateParameters } from 'src/health/shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  styleUrls: ['meal-form.component.scss'],
  templateUrl: './meal-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealFormComponent {
  @Output() create = new EventEmitter<MealCreateParameters>();

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array(['']),
  });

  get required() {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    );
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit({
        name: this.form.value.name || '',
        ingredients: this.form.value.ingredients as string[],
      });
    }
  }
}
