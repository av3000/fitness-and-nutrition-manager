import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { IngredientsComponent } from './containers/ingredients/ingredients.component';
import { IngredientFormComponent } from './components/ingredient-form/ingredient-form.component';
import { IngredientItemComponent } from './containers/ingredient/ingredient-item.component';

export const ROUTES: Routes = [
  { path: '', component: IngredientsComponent },
  { path: 'new', component: IngredientItemComponent },
  { path: ':id', component: IngredientItemComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
  ],
  declarations: [
    IngredientsComponent,
    IngredientItemComponent,
    IngredientFormComponent,
  ],
})
export class IngredientsModule {}
