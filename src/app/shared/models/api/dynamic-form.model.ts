export class DynamicForm {
  _id?: string;
  name = '';
  info? = '';
  items: any[] = [];
  created?: string;
  updated?: string;
  constructor(data?: DynamicForm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
