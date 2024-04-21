import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { WorkoutItemComponent } from './containers/workout/workout-item.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';

export const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent },
  { path: 'new', component: WorkoutItemComponent },
  { path: ':id', component: WorkoutItemComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
  ],
  declarations: [
    WorkoutsComponent,
    WorkoutItemComponent,
    WorkoutFormComponent,
    WorkoutTypeComponent,
  ],
})
export class WorkoutsModule {}
