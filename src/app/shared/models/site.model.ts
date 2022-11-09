export class Site {
  _id?: string;
  name? = '';
  address: any = {
    city: '',
    country: 'es',
    coordinates: [],
  };
  type = null;
  image? = '';
  styles?: any[] = [];
  info? = '';
  slug?: string;
  social = {
    web: '',
    facebook: '',
    twitter: '',
    spotify: '',
    soundcloud: '',
    instagram: '',
    tiktok: '',
    email: '',
  };
  sets?: any;
  events?: any;
  created?: string;
  updated?: string;
  constructor(data?: Site) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}