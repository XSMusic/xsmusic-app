export class ButtonBlockItem {
  name = '';
  isActive? = false;
  isActivatable? = false;
  action = '';

  constructor(data?: ButtonBlockItem) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
