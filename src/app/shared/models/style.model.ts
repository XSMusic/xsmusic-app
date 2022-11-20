export class Style {
  _id?: string;
  name? = '';
  colors = {
    bg: '',
    text: '',
  };
  created? = '';
  updated? = '';
  artists?: any;
  sets?: any;
  tracks?: any;
  clubs?: any;
  festivals?: any;
  events?: any;

  constructor(data?: Style) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
