import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  templateUrl: './schedule-calendar.component.html',
})
export class ScheduleCalendarComponent implements OnChanges {
  @Output() change = new EventEmitter<Date>();
  @Input()
  set date(date: Date | null) {
    if (date) {
      this.selectedDay = new Date(date.getTime());
    }
  }

  selectedDayIndex!: number;
  selectedDay!: Date | null;
  selectedWeek!: Date;

  ngOnChanges() {
    if (this.selectedDay) {
      this.selectedDayIndex = this.getToday(this.selectedDay);
      this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
    }
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  getToday(date: Date) {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate() + weekOffset * 7
    );

    this.change.emit(startDate);
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
}
