import { Media } from '@models';
import { countries } from 'assets/data/countries';
import { flags } from 'assets/data/flags';

export const countryFlag = (countryCode: string): string => {
  return flags[countryCode];
};

export const countryName = (countryCode: string): string => {
  return countries.find((item) => item.id === countryCode)?.name ?? 'es';
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

export const randomNumber = (max: number, min = 1, decimal = false): any => {
  if (!decimal) {
    if (min > 1) {
      return (Math.random() * (max - min) + min).toFixed(0);
    }
    return (Math.random() * (max - min)).toFixed(0);
  } else if (decimal) {
    const maxArray = max.toString().split('.');
    const maxOk = [Number(maxArray[0]), Number(maxArray[1])];
    const minArray = min.toString().split('.');
    const minOk = [Number(minArray[0]), Number(minArray[1])];
    const dataOk = Math.random() * (max - min) + min;
    const dataSubOk: any = randomNumber(maxOk[1], minOk[1]);
    return dataOk.toFixed(0) + '.' + dataSubOk;
  }
};

export const getTitleMedia = (item: Media) => {
  let title = '';
  item.artists!.forEach((artist, i) => {
    if (i !== 0) {
      title += ' & ';
    }
    title += artist.name;
  });
  if (item.site && item.site.name && item.site.name !== 'Desconocido') {
    title += ` @  ${item.site.name}`;
  } else if (item.site && item.site.name && item.site.name === 'Desconocido') {
    title += ` @  ${item.name}`;
  } else {
    title += ` @  ${item.name}`;
  }
  if (item.year !== 0) {
    title += ' ' + item.year;
  }
  return title;
};
