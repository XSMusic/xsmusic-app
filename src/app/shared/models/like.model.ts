export class Like {
  _id?: string;
  type!: 'artist' | 'event' | 'media' | 'site';
  artist?: any;
  event?: any;
  media?: any;
  site?: any;
  user: any;
  created?: string;
  updated?: string;

  constructor(data?: Like) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
