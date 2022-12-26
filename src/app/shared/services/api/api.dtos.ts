export class GetAllDto {
  page? = 1;
  pageSize? = 10;
  order? = ['created', 'desc'];
  id?: string;
  type?: string;
  typeMedia?: string;
  map?: boolean;
  maxDistance?: number;
  filter?: any;
  coordinates?: any;
  complete?: boolean;

  constructor(data?: GetAllDto) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class GetOneDto {
  type?: 'id' | 'slug';
  value?: string;
  admin?: boolean;
  constructor(data?: GetAllDto) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
