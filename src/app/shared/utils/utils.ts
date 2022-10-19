import { countries } from 'assets/data/countries';
import { flags } from 'assets/data/flags';

export const countryFlag = (countryCode: string): string => {
  return flags[countryCode];
};

export const countryName = (countryCode: string): string => {
  return countries.find((item) => item.id === countryCode)?.name!;
};

export const getYearsOld = (dateString: string) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return `${age}`;
};

export const isEmptyObject = (obj: Record<string, any>) => {
  return Object.keys(obj).length === 0;
};
