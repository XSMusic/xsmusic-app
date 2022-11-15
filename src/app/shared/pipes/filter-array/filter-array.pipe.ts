import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray',
})
export class FilterArrayPipe implements PipeTransform {
  transform(array: any[], filter: string, filterValue: string): any[] {
    return array.filter((value) => value[filter] === filterValue);
  }
}
