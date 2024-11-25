import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';

import {
  Ingredient,
  IngredientsService,
} from 'src/health/shared/services/ingredients/ingredients.service';
import { HealthFeatureType } from 'src/health/shared/enums';

@Component({
  selector: 'ingredients',
  styleUrls: ['./ingredients.component.scss'],
  templateUrl: './ingredients.component.html',
})
export class IngredientsComponent {
  ingredients$!: Observable<Ingredient[]>;
  private subs$ = new Subscription();

  featureTypeIngredient = HealthFeatureType.Ingredient;

  constructor(private service: IngredientsService, private store: Store) {}

  ngOnInit(): void {
    this.ingredients$ = this.store.select<Ingredient[]>('ingredients');
    this.subs$.add(this.service.ingredients$.subscribe());
  }

  removeIngredient(event: Ingredient): void {
    this.service.delete(event.$key);
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
