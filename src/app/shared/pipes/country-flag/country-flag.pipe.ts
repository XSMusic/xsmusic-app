import { Pipe, PipeTransform } from '@angular/core';
import { flags } from 'assets/data/flags';

@Pipe({
  name: 'countryFlag',
})
export class CountryFlagPipe implements PipeTransform {
  transform(countryCode: string) {
    if (countryCode) {
      return flags[countryCode];
    }
  }
}
