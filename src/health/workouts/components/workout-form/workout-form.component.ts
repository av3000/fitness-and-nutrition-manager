import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WorkoutType, WorkoutTypes } from 'src/health/shared/enums';

import {
  Workout,
  WorkoutCreateParameters,
} from 'src/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'workout-form',
  styleUrls: ['workout-form.component.scss'],
  templateUrl: './workout-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutFormComponent implements OnInit {
  @Output() create = new EventEmitter<WorkoutCreateParameters>();
  @Output() update = new EventEmitter<Workout>();
  @Output() remove = new EventEmitter<string>();
  @Input() workout: Workout | null = null;

  strengthType = WorkoutTypes.find(
    (type) => type.value === WorkoutType.Strength
  );
  enduranceType = WorkoutTypes.find(
    (type) => type.value === WorkoutType.Endurance
  );

  toggled = false;
  exists = false;

  form = this.fb.group({
    name: ['', Validators.required],
    type: WorkoutType.Strength,
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0,
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0,
    }),
  });

  get placeholder(): string {
    return `e.g. ${
      this.form.get('type')?.value === 'strength' ? 'Benchpress' : 'Treadmill'
    }`;
  }

  get required() {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    );
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.workout && this.workout.name) {
      this.exists = true;
      this.form.patchValue(this.workout);
    }
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value as WorkoutCreateParameters);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value as Workout);
    }
  }

  removeWorkout() {
    this.remove.emit(this.workout?.$key);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
