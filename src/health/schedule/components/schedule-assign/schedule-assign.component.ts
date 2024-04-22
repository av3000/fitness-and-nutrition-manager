import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonFirebaseInstance } from 'src/health/shared/types';

@Component({
  selector: 'schedule-assign',
  styleUrls: ['schedule-assign.component.scss'],
  templateUrl: './schedule-assign.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAssignComponent implements OnInit {
  @Input() section!: any;
  @Input() list!: CommonFirebaseInstance[];
  @Output() update = new EventEmitter();
  @Output() cancel = new EventEmitter();

  private selected: string[] = [];

  ngOnInit() {
    this.selected = [...this.section.assigned];
  }

  toggleItem(name: string) {
    this.exists(name)
      ? (this.selected = this.selected.filter((item) => item !== name))
      : (this.selected = [...this.selected, name]);
  }

  getRoute(routeName: string) {
    return [`../${routeName}/new`];
  }

  exists(name: string) {
    return this.selected.includes(name);
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected,
    });
  }

  cancelAssign() {
    this.cancel.emit(true);
  }
}
