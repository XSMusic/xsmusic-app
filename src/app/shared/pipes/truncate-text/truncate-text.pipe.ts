import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'truncateText',
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, maxLength = 10, points = true): string {
    if (value && value.length > maxLength) {
      value = value.slice(0, maxLength);
      if (points) {
        value += '...';
      }
    }

    return value;
  }
}
