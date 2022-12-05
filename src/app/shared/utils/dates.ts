import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import * as es from 'dayjs/locale/es'

dayjs.locale(es);
dayjs.extend(utc);
dayjs.extend(timezone);

export class DateFunctions {
  static new(date?: string, format?: string): dayjs.Dayjs {
    if (date === undefined) {
      return dayjs();
    }
    if (format) {
      return dayjs(date, format);
    } else {
      return dayjs(date);
    }
  }
}
