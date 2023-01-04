import { Image } from './image.model';

export class User {
  _id?: string;
  name!: string;
  email!: string;
  images?: Image[];
  role!: 'ADMIN' | 'USER';
  darkMode!: string;
  slug!: string;
  lastLogin?: string;
  created?: string;
  updated?: string;

  constructor(data?: User) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
