export class Media {
  _id?: string;
  name? = '';
  image? = '';
  artists?: any[] = [];
  type? = '';
  styles?: any[] = [];
  info? = '';
  source?: any = null;
  sourceId? = '';
  year? = 0;
  created?: string;
  updated?: string;

  constructor(data?: Media) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
