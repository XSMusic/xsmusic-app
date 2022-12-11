import { Pipe, PipeTransform } from '@angular/core';
import { DateFunctions } from '@shared/utils/dates';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(date: string, showText = true): string {
    const data = DateFunctions.new(date).locale('es');
    if (showText) {
      return data.fromNow();
    } else {
      return data.fromNow(true);
    }
  }
}
