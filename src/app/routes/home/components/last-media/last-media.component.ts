import { Component, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { GetAllDto } from '@interfaces';
import { Media } from '@models';
import { MediaService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'last-media',
  templateUrl: './last-media.component.html',
  animations: [inOutAnimation],
})
export class LastMediaComponent implements OnInit {
  sets: Media[] = [];
  tracks: Media[] = [];
  body: GetAllDto = {
    page: 1,
    pageSize: 4,
    order: ['created', 'desc'],
    type: 'set',
  };
  view = 'sets';
  loading = true;
  constructor(
    private mediaService: MediaService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.getLastSets();
    this.getLastTracks();
  }

  getLastSets() {
    this.loading = true;
    this.body.type = 'set';
    this.mediaService.getAll(this.body).subscribe({
      next: (response) => {
        this.sets = response.items;
        this.loading = false;
      },
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  getLastTracks() {
    this.body.type = 'track';
    this.mediaService.getAll(this.body).subscribe({
      next: (response) => {
        this.tracks = response.items;
      },
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }
}
