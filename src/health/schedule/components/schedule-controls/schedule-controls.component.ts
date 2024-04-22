import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'schedule-controls',
  styleUrls: ['schedule-controls.component.scss'],
  templateUrl: './schedule-controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleControlsComponent {
  @Input() selected!: Date | null;
  @Output() move = new EventEmitter<number>();

  offset = 0;

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }
}
