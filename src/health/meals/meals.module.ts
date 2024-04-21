import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MealsComponent } from './containers/meals/meals.component';
import { MealItemComponent } from './containers/meal/meal-item.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';

export const ROUTES: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealItemComponent },
  { path: ':id', component: MealItemComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
  ],
  declarations: [MealsComponent, MealItemComponent, MealFormComponent],
})
export class MealsModule {}
