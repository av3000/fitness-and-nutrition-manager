import { Pipe, PipeTransform } from '@angular/core';

import { WorkoutType } from '../enums';

@Pipe({
  name: 'workout',
})
export class WorkoutPipe implements PipeTransform {
  transform(value: any) {
    if (value.type === WorkoutType.Endurance) {
      return `
        Distance: ${value.endurance.distance}km,
        Duration: ${value.endurance.duration}mins
      `;
    } else {
      return `
        Reps: ${value.strength.reps},
        Sets: ${value.strength.sets},
        Weight: ${value.strength.weight}kg
      `;
    }
  }
}
