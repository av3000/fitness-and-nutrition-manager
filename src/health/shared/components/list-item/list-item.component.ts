import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { HealthFeatureType } from '../../enums';

@Component({
  selector: 'list-item',
  styleUrls: ['./list-item.component.scss'],
  templateUrl: 'list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Input() item: any;
  @Input() backRoute!: string;
  @Input() healthFeatureType!: HealthFeatureType;
  @Output() remove = new EventEmitter<any>();

  featureTypeMeal = HealthFeatureType.Meal;
  featureTypeWorkout = HealthFeatureType.Workout;
  featureTypeIngridient = HealthFeatureType.Ingredient;

  toggled = false;

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  getRoute(item: any) {
    return [`../${this.backRoute}`, item.$key];
  }
}
