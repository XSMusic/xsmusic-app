export interface DynamicFormI {
  name: string;
  info: string;
  items: DynamicFormItemI[];
}

export interface DynamicFormItemI {
  name: string;
  label: string;
  value: string;
  type: string;
  required: boolean;
  placeholder: string;
  form: string;
  options?: DynamicFormItemOptionsI;
  validators: DynamicFormItemValidatorsI;
}

export interface DynamicFormItemOptionsI {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

export interface DynamicFormItemValidatorsI {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}
