import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import {
  Workout,
  WorkoutCreateParameters,
  WorkoutsService,
} from 'src/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'workout',
  styleUrls: ['workout-item.component.scss'],
  templateUrl: './workout-item.component.html',
})
export class WorkoutItemComponent {
  private subs$ = new Subscription();
  workout$: Observable<Workout | null> | undefined;

  constructor(
    private service: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs$.add(this.service.workouts$.subscribe());
    this.workout$ = this.route.params.pipe(
      switchMap((param) => this.service.getOne(param['id']))
    );
  }

  createWorkout(workoutCreateParams: WorkoutCreateParameters) {
    this.service.create(workoutCreateParams);
    this.backToWorkouts();
  }

  updateWorkout(updatedWorkout: Workout) {
    const key = this.route.snapshot.params['id'];
    this.service.update(key, updatedWorkout);
    this.backToWorkouts();
  }

  removeWorkout(event: string) {
    const key = this.route.snapshot.params['id'];
    this.service.delete(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['/workouts']);
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
