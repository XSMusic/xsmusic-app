import { Component, OnInit } from '@angular/core';
import { MediaGetAllDto } from '@interfaces';
import { Media } from '@models';
import { MediaService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'last-media',
  templateUrl: './last-media.component.html',
})
export class LastMediaComponent implements OnInit {
  sets: Media[] = [];
  tracks: Media[] = [];
  body: MediaGetAllDto = {
    page: 1,
    pageSize: 4,
    order: ['created', 'desc'],
    type: 'set',
  };
  view = 'sets';
  constructor(
    private mediaService: MediaService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.getLastSets();
    this.getLastTracks();
  }

  getLastSets() {
    this.body.type = 'set';
    this.mediaService.getAll(this.body).subscribe({
      next: (response) => {
        this.sets = response.items;
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