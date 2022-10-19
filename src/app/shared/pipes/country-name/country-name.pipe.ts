import { Pipe, PipeTransform } from '@angular/core';
import { countries } from 'assets/data/countries';

@Pipe({
  name: 'countryName',
})
export class CountryNamePipe implements PipeTransform {
  transform(countryCode: string): string {
    return countries.find((item) => item.id === countryCode)?.name!;
  }
}
