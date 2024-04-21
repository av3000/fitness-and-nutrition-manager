import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { WorkoutTypes } from 'src/health/shared/enums';

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true,
};

@Component({
  selector: 'workout-type',
  providers: [TYPE_CONTROL_ACCESSOR],
  styleUrls: ['workout-type.component.scss'],
  templateUrl: './workout-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutTypeComponent implements ControlValueAccessor {
  selectors = WorkoutTypes;
  value: string | null = null;

  private onTouch: Function | null = null;
  private onModelChange: Function | null = null;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  set(value: string): void {
    this.value = value;
    if (this.onModelChange) {
      this.onModelChange(value);
    }
    if (this.onTouch) {
      this.onTouch();
    }
  }
}
