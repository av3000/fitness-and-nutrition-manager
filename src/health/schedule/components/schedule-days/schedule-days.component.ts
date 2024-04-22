import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'schedule-days',
  styleUrls: ['schedule-days.component.scss'],
  templateUrl: './schedule-days.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDaysComponent {
  @Input() selected!: number;
  @Output() select = new EventEmitter<number>();

  days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  selectDay(index: number) {
    this.select.emit(index);
  }
}
