import { GenericItemType, GenericSubItemType, GoToType } from "@shared/utils";

export class GA {
  event = '';
  one?: boolean;
  type?: GoToType;
  constructor(data?: GA) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
