import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { MessageI } from '@interfaces';
import { Artist, Style } from '@models';
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
  view = 'viewInfo';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private styleService: StyleService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.getOne();
      this.title = 'Editar Estilo';
    } else {
      this.title = 'Nuevo Estilo';
    }
  }

  getOne() {
    this.styleService.getOneById({ id: this.id }).subscribe({
      next: (response) => {
        if (!response.colors) {
          this.style.colors = {
            bg: '',
            text: '',
          };
        }
        console.log(response);
        this.style = response;
      },
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onSuccess(response: MessageI) {
    this.toastService.showToast(TOAST_STATE.success, response.message);
    this.router.navigate(['admin/styles']);
  }

  onClickButton(event: any) {
    this.view = event.action;
  }

  goTo(type: string, artist: Artist) {
    if (type === 'artist') {
      this.router.navigate([
        routesConfig.artistAdmin.replace(':id', artist._id!),
      ]);
    }
  }
}
