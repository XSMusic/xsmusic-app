import { Pipe, PipeTransform } from '@angular/core';
import { firstLetterCase } from '@shared/utils';

@Pipe({
  name: 'firstLetterCase',
})
export class FirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    return firstLetterCase(value);
  }
}
