import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  Workout,
  WorkoutsService,
} from 'src/health/shared/services/workouts/workouts.service';
import { Store } from 'store';

@Component({
  selector: 'workouts',
  styleUrls: ['./workouts.component.scss'],
  templateUrl: './workouts.component.html',
})
export class WorkoutsComponent {
  workouts$!: Observable<Workout[]>;
  private subs$ = new Subscription();

  constructor(private service: WorkoutsService, private store: Store) {}

  ngOnInit(): void {
    this.workouts$ = this.store.select<Workout[]>('workouts');
    this.subs$.add(this.service.workouts$.subscribe());
  }

  removeWorkout(event: Workout): void {
    this.service.delete(event.$key);
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
