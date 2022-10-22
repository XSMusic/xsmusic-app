import { Component, Input, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist } from '@models';
import { ArtistService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'app-last-artists-block',
  templateUrl: 'last-artists-block.component.html',
  animations: [inOutAnimation],
})
export class LastArtistsBlockComponent implements OnInit {
  @Input() artists?: Artist[] = [];
  constructor(
    private artistService: ArtistService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getLastArtists();
  }

  getLastArtists() {
    this.artistService
      .getAll({
        page: 1,
        pageSize: 3,
        order: ['created', 'desc'],
      })
      .subscribe({
        next: (response) => (this.artists = response.items),
        error: (error) => this.toast.showToast(TOAST_STATE.error, error),
      });
  }
}
