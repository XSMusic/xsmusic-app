export class Image {
  _id?: string;
  type: any;
  artist?: any;
  media?: any;
  site?: any;
  url?: string;
  firstImage?: boolean;
  position?: number;
  size?: string;
  created?: string;
  updated?: string;

  constructor(data?: Image) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
