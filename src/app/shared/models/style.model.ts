export class Style {
  _id?: string;
  name? = '';
  created? = '';
  updated? = '';
  artists?: { count: number };

  constructor(data?: Style) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
