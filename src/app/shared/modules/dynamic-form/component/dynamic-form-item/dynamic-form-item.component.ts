import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormBase } from '../..';


@Component({
  selector: 'dynamic-form-item',
  templateUrl: './dynamic-form-item.component.html',
})
export class DynamicFormItemComponent {
  @Input() item!: DynamicFormBase<string>;
  @Input() form!: FormGroup;

get isValid() {
    return this.form.controls[this.item.key].valid;
}

get isTouched() {
    return this.form.controls[this.item.key].touched;
}

get isDirty() {
    return this.form.controls[this.item.key].dirty;
  }
}
