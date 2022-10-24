import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageI } from '@interfaces';
import { Style } from '@models';
import { ToastService } from '@services';
import { StyleService } from '@shared/services/api/style/style.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'page-admin-style',
  templateUrl: 'admin-style.page.html',
})
export class AdminStylePage implements OnInit {
  id!: string;
  style = new Style();
  title!: string;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private styleService: StyleService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.getOne();
      this.title = 'Editar Estilo';
    } else {
      this.title = 'Nuevo Estilo';
      this.initForm();
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [this.style.name, [Validators.minLength(3), Validators.required]],
    });
  }

  getOne() {
    this.styleService.getOneById({ id: this.id }).subscribe({
      next: (response) => {
        this.style = response;
        this.initForm();
      },
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onSubmit() {
    this.style.name = this.form.value['name'];
    const observable = this.id
      ? this.styleService.update(this.style)
      : this.styleService.create(this.style);
    observable.subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onDelete() {
    // TODO: Añadir confirmacion por modal
    this.styleService.deleteOne(this.id).subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onSuccess(response: MessageI) {
    this.toastService.showToast(TOAST_STATE.success, response.message);
    this.router.navigate(['admin/styles']);
  }
}
