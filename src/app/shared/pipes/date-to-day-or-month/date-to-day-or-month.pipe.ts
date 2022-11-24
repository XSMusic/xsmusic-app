import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateToDayOrMonth',
})
export class DateToDayOrMonthPipe implements PipeTransform {
  transform(value: string, dayOrMonth = 'day'): string {
    return dayOrMonth === 'day'
      ? moment(value).locale('es').format('DD').substring(0, 2)
      : moment(value).locale('es').format('MMM').substring(0, 3);
  }
}
