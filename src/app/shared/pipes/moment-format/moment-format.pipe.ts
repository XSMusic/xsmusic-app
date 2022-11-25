import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentFormat',
})
export class MomentFormatAgoPipe implements PipeTransform {
  transform(dateTime: string, format: string): string {
    return moment(dateTime).locale('es').format(format);
  }
}
