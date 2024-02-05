import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(timeInSeconds: number): string {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) {
      // Handle NaN or negative values, you can return a default value or an empty string
      return '00:00';
    }

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }
}
