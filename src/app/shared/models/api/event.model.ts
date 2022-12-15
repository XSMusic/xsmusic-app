import { Image } from './image.model';

export class Event {
  _id?: string;
  name = '';
  images?: Image[];
  date? = '';
  styles?: any[] = [];
  artists?: any[] = [];
  site?: any;
  info? = '';
  slug?: string;
  created?: string;
  updated?: string;
  constructor(data?: Event) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
