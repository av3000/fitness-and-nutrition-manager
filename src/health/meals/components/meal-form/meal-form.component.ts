import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import {
  Meal,
  MealCreateParameters,
} from 'src/health/shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  styleUrls: ['meal-form.component.scss'],
  templateUrl: './meal-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealFormComponent implements OnInit {
  @Output() create = new EventEmitter<MealCreateParameters>();
  @Output() update = new EventEmitter<Meal>();
  @Output() remove = new EventEmitter<string>();
  @Input() meal: Meal | null = null;

  toggled = false;
  exists = false;

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

  ngOnInit() {
    if (this.meal && this.meal.name) {
      this.exists = true;
      this.ingredients.clear();

      this.form.patchValue({ name: this.meal.name });

      if (this.meal.ingredients) {
        for (const item of this.meal.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

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
        ingredients: this.form.value.ingredients?.filter(
          (ingredient) => ingredient
        ) as string[],
      });
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value as Meal);
    }
  }

  removeMeal() {
    this.remove.emit(this.meal?.$key);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
