import { Component, OnInit } from '@angular/core';
import { GetAllDto } from '@interfaces';
import { DynamicForm } from '@models';
import { DynamicFormService, ToastService, TOAST_STATE } from '@services';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';

@Component({
  selector: 'admin-dynamic-forms',
  templateUrl: 'admin-dynamic-forms.page.html',
})
export class AdminDynamicFormsPage implements OnInit {
  view = 'viewList';
  bodyForm: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['created', 'asc'],
    type: 'form',
  };
  forms: DynamicForm[] = [];
  constructor(
    private dynamicFormService: DynamicFormService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getAllForms();
    this.getOne();
  }

  getAllForms() {
    this.dynamicFormService.getAll(this.bodyForm).subscribe({
      next: (response) => {
        console.log(response);
        this.forms = response.items;
      },
      error: (error: any) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }

  getOne() {
    this.dynamicFormService
      .getOne({
        type: 'form',
        subType: 'add',
        name: 'dynamicForm',
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error: any) => this.toast.showToast(TOAST_STATE.error, error),
      });
  }

  onClickTab(event: TabsItem) {
    this.view = event.action;
  }
}
