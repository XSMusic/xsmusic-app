import {
  Component,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicForm, DynamicFormItem } from '@models';

@Component({
  selector: 'app-json-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnChanges {
  @Input() form!: DynamicForm;
  public myForm: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['form'].firstChange) {
      this.createForm(this.form.items);
    }
  }

  createForm(items: DynamicFormItem[]) {
    for (const item of items) {
      const validatorsToAdd = [];
      if (item.validators) {
        for (const [key, value] of Object.entries(item.validators)) {
          switch (key) {
            case 'min':
              validatorsToAdd.push(Validators.min(value));
              break;
            case 'max':
              validatorsToAdd.push(Validators.max(value));
              break;
            case 'required':
              if (value) {
                validatorsToAdd.push(Validators.required);
              }
              break;
            case 'requiredTrue':
              if (value) {
                validatorsToAdd.push(Validators.requiredTrue);
              }
              break;
            case 'email':
              if (value) {
                validatorsToAdd.push(Validators.email);
              }
              break;
            case 'minLength':
              validatorsToAdd.push(Validators.minLength(value));
              break;
            case 'maxLength':
              validatorsToAdd.push(Validators.maxLength(value));
              break;
            case 'pattern':
              validatorsToAdd.push(Validators.pattern(value));
              break;
            case 'nullValidator':
              if (value) {
                validatorsToAdd.push(Validators.nullValidator);
              }
              break;
            default:
              break;
          }
        }
        this.myForm.addControl(
          item.name,
          this.fb.control(item.value, validatorsToAdd)
        );
      }
    }
  }

  onSubmit() {
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
  }
}
