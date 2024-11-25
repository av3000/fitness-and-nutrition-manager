import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

import {
  Ingredient,
  IngredientCreateParameters,
} from 'src/health/shared/services/ingredients/ingredients.service';

@Component({
  selector: 'ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientFormComponent implements OnInit {
  @Output() create = new EventEmitter<IngredientCreateParameters>();
  @Output() update = new EventEmitter<Ingredient>();
  @Output() remove = new EventEmitter<string>();
  @Input() ingredient: Ingredient | null = null;

  toggled = false;
  exists = false;

  form = this.fb.group({
    title: ['', Validators.required],
    calorie: [0, [Validators.required, Validators.min(0)]],
    description: [''],
    macroelements: this.fb.array([]),
  });

  get requiredTitle() {
    return (
      this.form.get('title')?.hasError('required') &&
      this.form.get('title')?.touched
    );
  }

  get macroelements() {
    return this.form.get('macroelements') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.ingredient) {
      console.log('exists, tiis ingrd', this.ingredient);
      this.exists = true;

      this.form.patchValue({
        title: this.ingredient.title,
        calorie: this.ingredient.calorie,
        description: this.ingredient.description,
      });

      this.ingredient.macroelements.forEach((macro) => {
        this.macroelements.push(
          this.fb.group({
            title: [macro.title, Validators.required],
            amount: [macro.amount, [Validators.required, Validators.min(0)]],
          })
        );
      });
    }
  }

  addMacroElement() {
    this.macroelements.push(
      this.fb.group({
        title: ['', Validators.required], // Dropdown or input
        amount: [0, [Validators.required, Validators.min(0)]],
      })
    );
  }

  removeMacroElement(index: number) {
    this.macroelements.removeAt(index);
  }

  createIngredient() {
    if (this.form.valid) {
      this.create.emit(this.form.value as IngredientCreateParameters);
    }
  }

  updateIngredient() {
    if (this.form.valid) {
      this.update.emit(this.form.value as Ingredient);
    }
  }

  removeIngredient() {
    this.remove.emit(this.ingredient?.$key);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
