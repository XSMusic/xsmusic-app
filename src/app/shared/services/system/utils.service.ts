import { Injectable } from '@angular/core';
import { countries } from 'assets/json/countries';
import { flags } from 'assets/json/flags';

@Injectable({ providedIn: 'root' })
export class UtilsService {

  countryFlag(countryCode: string): string {
    return flags[countryCode];
  }

  countryName(countryCode: string): string {
    return countries.find((item) => item.id === countryCode)?.name!;
  }

  getYearsOld(dateString: string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return `${age}`;
  }
}
