import { Pipe, PipeTransform } from '@angular/core';
import { DateFunctions } from '@shared/utils/dates';
@Pipe({
  name: 'dateFormat',
})
export class DateFormatAgoPipe implements PipeTransform {
  transform(dateTime: string, format: string): string {
    return DateFunctions.new(dateTime).locale('es').format(format);
  }
}
