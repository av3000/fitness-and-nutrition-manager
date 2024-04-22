import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  templateUrl: './schedule-calendar.component.html',
})
export class ScheduleCalendarComponent {
  @Output() change = new EventEmitter<Date>();
  @Input()
  set date(date: Date | null) {
    if (date) {
      this.selectedDay = new Date(date.getTime());
    }
  }

  selectedDay!: Date | null;

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
