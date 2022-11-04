import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fill-array',
})
export class FillArrayPipe implements PipeTransform {
  transform(array: any): any {
    const newArray = [1, 2, 3];
    return newArray.splice(0, array.length);
  }
}
