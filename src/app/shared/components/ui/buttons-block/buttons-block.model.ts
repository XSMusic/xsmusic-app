export class ButtonBlockItem {
  name = '';
  isFirst? = false;
  isLast? = false;
  isActive? = false;
  isActivatable? = false;
  icon = '';
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
