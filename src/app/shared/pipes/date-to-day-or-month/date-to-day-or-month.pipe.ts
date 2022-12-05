import { Pipe, PipeTransform } from '@angular/core';
import { DateFunctions } from '@shared/utils/dates';

@Pipe({
  name: 'dateToDayOrMonth',
})
export class DateToDayOrMonthPipe implements PipeTransform {
  transform(value: string, dayOrMonth = 'day'): string {
    return dayOrMonth === 'day'
      ? DateFunctions.new(value).locale('es').format('DD').substring(0, 2)
      : DateFunctions.new(value).locale('es').format('MMM').substring(0, 3);
  }
}
