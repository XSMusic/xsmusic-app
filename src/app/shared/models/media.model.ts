import { Image } from './image.model';

export class Media {
  _id?: string;
  name? = '';
  images?: Image[] = [];
  artists?: any[] = [];
  type: 'set' | 'track' = 'set';
  site?: any;
  styles?: any[] = [];
  info? = '';
  source?: any = null;
  sourceId? = '';
  year? = 0;
  slug? = '';
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
