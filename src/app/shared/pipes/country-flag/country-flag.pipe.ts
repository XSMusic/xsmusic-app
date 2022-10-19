import { Pipe, PipeTransform } from '@angular/core';
import { flags } from 'assets/data/flags';

@Pipe({
  name: 'countryFlag',
})
export class CountryFlagPipe implements PipeTransform {
  transform(countryCode: string): string {
    return flags[countryCode];
  }
}
