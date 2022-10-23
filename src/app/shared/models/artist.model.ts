export class Artist {
  _id? = '';
  name? = '';
  image? = '';
  birthdate? = '';
  styles?: string[] = [];
  country? = 'es';
  gender? = '';
  info? = '';
  slug? = '';
  created? = '';
  updated? = '';
  constructor(data?: Artist) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
