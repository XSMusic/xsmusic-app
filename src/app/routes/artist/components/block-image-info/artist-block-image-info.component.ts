import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { Artist } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { getYearsOld } from '@shared/utils';

@Component({
  selector: 'artist-block-image-info',
  templateUrl: 'artist-block-image-info.component.html',
})
export class ArtistBlockImageInfoComponent {
  @Input() artist: Artist = new Artist();
  viewMore = false;
  getYearsOld = getYearsOld;

  constructor(private fullImage: FullImageService, private router: Router) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  goToEdit(id: string) {
    this.router.navigate(['admin/artists/one/', id]);
  }

  goToArtistFilter(key: string, value: string) {
    this.router.navigate([
      routesConfig.artistsFilter
        .replace(':filterKey', key)
        .replace(':filterValue', value),
    ]);
  }
}
