import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist } from '@models';
import { ToastService } from '@services';
import { ArtistService } from '@shared/services/api/artist/artist.service';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { TOAST_STATE } from '../../../../shared/services/ui/toast/toast.service';

@Component({
  selector: 'artist',
  templateUrl: 'artist.page.html',
  animations: [inOutAnimation],
})
export class ArtistPage implements OnInit {
  artist!: Artist;
  artists: Artist[] = [];
  slug!: string;
  information: { name: string; type?: string; value: any }[] = [];
  viewMore = false;
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private fullImage: FullImageService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.getArtist();
  }

  getArtist() {
    this.artistService.getOneBySlug({ slug: this.slug })!.subscribe({
      next: (artist: any) => {
        this.artist = artist;
      },
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }
}
