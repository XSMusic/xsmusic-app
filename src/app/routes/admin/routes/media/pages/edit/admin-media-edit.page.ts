import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { Media } from '@models';
import { MediaService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'page-admin-media-edit',
  templateUrl: 'admin-media-edit.page.html',
})
export class AdminMediaEditPage implements OnInit {
  id!: string;
  media: Media = new Media();
  title = '';
  type = '';
  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    private mediaService: MediaService
  ) {}

  ngOnInit() {
    this.type = this.route.snapshot.routeConfig!.path!.includes('sets')
      ? 'sets'
      : 'tracks';
    this.title = this.type === 'sets' ? 'Editar Set' : 'Editar Track';
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getItem();
  }

  getItem() {
    this.mediaService.getOne({ id: this.id }).subscribe({
      next: (response) => (this.media = response),
      error: (error: any) =>
        this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onSubmitSuccess() {
    this.media = new Media();
    const route =
      this.type === 'sets'
        ? [routesConfig.setsAdmin]
        : [routesConfig.tracksAdmin];
    this.router.navigate(route);
  }
}
