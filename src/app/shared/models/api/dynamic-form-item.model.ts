import { DynamicFormItemOptionsI, DynamicFormItemValidatorsI } from "@shared/components/form/dynamic-form.inteface";

export class DynamicFormItem {
  _id?: string;
  name = '';
  label?: string;
  value?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  form?: string;
  options?: DynamicFormItemOptionsI;
  validators?: DynamicFormItemValidatorsI;
  created?: string;
  updated?: string;
  constructor(data?: DynamicFormItem) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
