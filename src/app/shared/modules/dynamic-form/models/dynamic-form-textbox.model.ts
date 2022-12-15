import { DynamicFormBase } from "..";

export class DynamicFormTextbox extends DynamicFormBase<string> {
  override controlType = 'textbox';
}
