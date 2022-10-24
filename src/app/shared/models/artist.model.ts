export class Artist {
  _id?: string;
  name? = '';
  image? = '';
  birthdate? = '';
  styles?: any[] = [];
  country? = 'es';
  gender? = '';
  info? = '';
  slug?: string;
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
