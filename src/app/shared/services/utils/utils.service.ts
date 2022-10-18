import { Injectable } from '@angular/core';
import { countries } from 'assets/json/countries';
import { flags } from 'assets/json/flags';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  constructor() {}

  countryFlag(countryCode: string): string {
    return flags[countryCode];
  }

  countryName(countryCode: string): string {
    return countries.find((item)=> item.id === countryCode)?.name!;
  }
}
