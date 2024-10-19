import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Meal } from 'src/health/shared/services/meals/meals.service';
import { ScheduleItem } from 'src/health/shared/services/schedule/schedule.service';
import { Workout } from 'src/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleSectionComponent {
  @Input() name!: string;
  @Input() section!: ScheduleItem;
  @Input() hasWorkoutsSection = true;
  @Output() select = new EventEmitter<any>();

  onSelect(type: string, assigned: Meal[] | Workout[] = []) {
    const data = this.section;
    this.select.emit({ type, assigned, data });
  }
}
