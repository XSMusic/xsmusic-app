export class User {
  _id?: string;
  name!: string;
  email!: string;
  image!: any;
  role!: string;
  darkMode!: string;
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
