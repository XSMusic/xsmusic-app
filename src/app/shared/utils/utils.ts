import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from '@env/environment';
import { FilterListI } from '@interfaces';
import { Image, Media, User } from '@models';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
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
  if (item.artists!.length > 0 && item.artists![0].name) {
    item.artists!.forEach((artist, i) => {
      if (i !== 0) {
        title += ' & ';
      }
      title += artist.name;
    });
    title += ' @ ';
  }
  if (item.site && item.site.name && item.site.name !== 'Desconocido') {
    title += `${item.site.name}`;
  } else if (item.site && item.site.name && item.site.name === 'Desconocido') {
    title += `${item.name}`;
  } else {
    title += `${item.name}`;
  }
  if (item.year !== 0) {
    title += ' ' + item.year;
  }
  return title;
};

export const darkMode = (user: User) => {
  if (user.darkMode === 'active') {
    document.documentElement.classList.add('dark');
  } else if (user.darkMode === 'desactive') {
    document.documentElement.classList.remove('dark');
  } else if (user.darkMode === 'system') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }
};

export const firstLetterCase = (value: string) => {
  if (value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  } else {
    return value;
  }
};

export const imageArray = (
  images: Image[],
  type: 'small' | 'medium' | 'big'
) => {
  if (images && images.length > 0) {
    return `${environment.urls.images}/${images[0].type}s/${type}/${images[0].url}`;
  } else {
    return '';
  }
};

export const getUserLocation = async (): Promise<number[]> => {
  return new Promise(async (resolve, reject) => {
    const locationLS = localStorage.getItem('location');
    if (locationLS) {
      resolve(JSON.parse(locationLS) as number[]);
    } else {
      try {
        const location = await Geolocation.getCurrentPosition();
        const coords = [location.coords.latitude, location.coords.longitude];
        localStorage.setItem('location', JSON.stringify(coords));
        resolve(coords);
      } catch (error) {
        reject(error);
      }
    }
  });
};

export const getTabByParam = (
  route: ActivatedRoute,
  tabs: TabsItem[]
): TabsItem | null => {
  const tabItem = tabs.filter(
    (tab) => tab.action === route.snapshot.queryParamMap.get('tab')
  )[0];
  return tabItem ? tabItem : null;
};

export const getKeyValueByParam = (
  route: ActivatedRoute
): { key: 'name'; value: string } => {
  return {
    key: route.snapshot.queryParamMap.get('fieldKey') as 'name',
    value: route.snapshot.queryParamMap.get('fieldValue')!,
  };
};

export const getFilterList = (route: ActivatedRoute): FilterListI => {
  const data: FilterListI = {
    key: '',
    value: '',
    data: [],
  };
  if (route.snapshot.queryParams) {
    data.key = route.snapshot.queryParams['key'];
    data.value = route.snapshot.queryParams['value'];
    if (data.key && data.value) {
      data.data = [data.key, data.value];
    }
  }

  return data;
};

export const capitalize = (str: string): string => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};
