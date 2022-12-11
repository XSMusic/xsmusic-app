export class TabsItem {
  name = '';
  isActive? = false;
  isActivatable? = false;
  action = '';
  align? = 'left';

  constructor(data?: TabsItem) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
