import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@models';
import { ToastService, UserService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'page-admin-user',
  templateUrl: 'admin-user.page.html',
})
export class AdminUserPage implements OnInit {
  id!: string;
  user: User = new User();
  title!: string;
  view = 'viewInfo';

  constructor(
    private userService: UserService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.title = 'Editar Artista';
      this.getOne();
    } else {
      this.title = 'Nuevo Artista';
    }
  }

  getOne() {
    this.spinner.show();
    this.userService.getOne({ id: this.id }).subscribe({
      next: (response) => {
        this.user = response;
        this.spinner.hide();
      },
      error: (error) => {
        this.toast.showToast(TOAST_STATE.error, error);
        this.spinner.hide();
      },
    });
  }
}
