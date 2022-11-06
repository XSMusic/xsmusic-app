export class Club {
  _id?: string;
  name? = '';
  address: any = {
    city: '',
    country: '',
    coordinates: [],
  };
  image? = '';
  birthdate? = '';
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
  created?: string;
  updated?: string;
  constructor(data?: Club) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
