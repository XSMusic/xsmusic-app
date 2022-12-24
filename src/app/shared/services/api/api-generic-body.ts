export class ApiGenericBody {
  page? = 1;
  pageSize? = 10;
  order? = ['created', 'asc'];
  id?: string;
  type?: string;
  typeMedia?: string;
  map?: boolean;
  maxDistance?: number;
  filter?: any;
  coordinates?: any;

  constructor(data?: ApiGenericBody) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
