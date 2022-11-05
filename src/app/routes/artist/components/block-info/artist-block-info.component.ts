import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Artist } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { getYearsOld } from '@shared/utils/utils';

@Component({
  selector: 'artist-block-info',
  templateUrl: 'artist-block-info.component.html',
  animations: [inOutAnimation],
})
export class ArtistBlockInfoComponent {
  @Input() artist: Artist = new Artist();
  viewMore = false;
  getYearsOld = getYearsOld;
  moreInfo = false;

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

  goToSocial(type: string) {
    window.open(type, '_black');
  }
}
