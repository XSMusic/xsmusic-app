import { Image } from './image.model';

export class Artist {
  _id?: string;
  name = '';
  images?: Image[];
  birthdate? = '';
  styles?: any[] = [];
  country? = 'es';
  gender? = 'male';
  info? = '';
  slug?: string;
  social? = {
    web: '',
    facebook: '',
    twitter: '',
    spotify: '',
    soundcloud: '',
    instagram: '',
    youtube: '',
    mixcloud: '',
    tiktok: '',
  };
  sets?: number;
  tracks?: number;
  events?: number;
  followers?: number;
  created?: string;
  updated?: string;
  constructor(data?: Artist) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
