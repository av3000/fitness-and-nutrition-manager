import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import {
  ScheduleItem,
  ScheduleList,
} from 'src/health/shared/services/schedule/schedule.service';

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  templateUrl: './schedule-calendar.component.html',
})
export class ScheduleCalendarComponent implements OnChanges {
  @Output() change = new EventEmitter<Date>();
  @Output() select = new EventEmitter<any>();
  @Input()
  set date(date: Date | null) {
    if (date) {
      this.selectedDay = new Date(date.getTime());
    }
  }

  @Input() items!: ScheduleList;

  selectedDayIndex!: number;
  selectedDay!: Date | null;
  selectedWeek!: Date;

  defaultSections = [
    { key: 'morning', name: 'Morning', hasWorkoutsSection: true },
    { key: 'lunch', name: 'Lunch', hasWorkoutsSection: true },
    { key: 'evening', name: 'Evening', hasWorkoutsSection: true },
    { key: 'snacks', name: 'Snacks and Drinks', hasWorkoutsSection: false },
  ];

  ngOnChanges() {
    if (this.selectedDay) {
      this.selectedDayIndex = this.getToday(this.selectedDay);
      this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
    }
  }

  getSection(name: string): ScheduleItem {
    return (this.items && this.items[name]) || {};
  }

  selectSection({ type, assigned, data }: any, section: string) {
    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data,
    });
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
