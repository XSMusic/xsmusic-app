import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceArray',
})
export class SliceArrayPipe implements PipeTransform {
  transform(value: any[], start: number, end: number): any {
    return value.slice(start, end);
  }
}
