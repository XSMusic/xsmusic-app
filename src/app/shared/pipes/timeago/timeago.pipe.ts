import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateToTimeAgo',
})
export class DateToTimeAgoPipe implements PipeTransform {
  transform(time: string, showText = true): string {
    const date = moment(time).locale('es');
    if (showText) {
      return date.fromNow();
    } else {
      return date.fromNow(true);
    }
  }
}
