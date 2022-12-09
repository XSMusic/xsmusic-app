export class GoToPage {
  type!: 'artist' | 'event' | 'media' | 'site';
  typeRoute: 'all' | 'one' = 'one';
  admin = false;
  item?: any;

  constructor(data?: GoToPage) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
