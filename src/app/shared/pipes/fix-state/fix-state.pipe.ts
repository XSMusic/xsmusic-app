import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixState',
})
export class FixStatePipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'Comunidad de Madrid') {
      return 'Madrid';
    } else {
      return value;
    }
  }
}
