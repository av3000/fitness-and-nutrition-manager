import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import {
  Ingredient,
  IngredientCreateParameters,
  IngredientsService,
} from 'src/health/shared/services/ingredients/ingredients.service';

@Component({
  selector: 'ingredient',
  styleUrls: ['./ingredient-item.component.scss'],
  templateUrl: './ingredient-item.component.html',
})
export class IngredientItemComponent {
  private subs$ = new Subscription();
  ingredient$: Observable<Ingredient | null> | undefined;

  constructor(
    private service: IngredientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs$.add(this.service.ingredients$.subscribe());
    this.ingredient$ = this.route.params.pipe(
      switchMap((param) => this.service.getOne(param['id']))
    );
  }

  createIngredient(ingredientCreateParams: IngredientCreateParameters) {
    this.service.create(ingredientCreateParams);
    this.backToIngredients();
  }

  updateIngredient(updatedIngredient: Ingredient) {
    const key = this.route.snapshot.params['id'];
    this.service.update(key, updatedIngredient);
    this.backToIngredients();
  }

  removeIngredient(event: string) {
    const key = this.route.snapshot.params['id'];
    this.service.delete(key);
    this.backToIngredients();
  }

  backToIngredients() {
    this.router.navigate(['/ingredients']);
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
