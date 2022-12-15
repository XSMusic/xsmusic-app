import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormBase, DynamicFormControlService } from '../..';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [DynamicFormControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() items: DynamicFormBase<string>[] | null = [];
  @Input() submitButton!: {
    name: string;
  };
  form!: FormGroup;
  payLoad = '';
  @Output() onSubmit = new EventEmitter<string>();

  constructor(private dfcs: DynamicFormControlService) {}

  ngOnInit() {
    this.form = this.dfcs.toFormGroup(this.items as DynamicFormBase<string>[]);
  }

  submit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.onSubmit.emit(this.payLoad);
  }
}
