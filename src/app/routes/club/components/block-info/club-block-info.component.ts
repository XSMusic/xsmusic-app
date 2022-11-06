import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Site } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';

@Component({
  selector: 'club-block-info',
  templateUrl: 'club-block-info.component.html',
  animations: [inOutAnimation],
})
export class ClubBlockInfoComponent {
  @Input() site: Site = new Site();
  viewMore = false;
  moreInfo = false;

  constructor(private fullImage: FullImageService, private router: Router) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  goToEdit(id: string) {
    this.router.navigate([routesConfig.clubAdmin.replace(':id', id)]);
  }

  goToArtistFilter(key: string, value: string) {
    this.router.navigate([
      routesConfig.clubsFilter
        .replace(':filterKey', key)
        .replace(':filterValue', value),
    ]);
  }

  goToSocial(type: string) {
    window.open(type, '_black');
  }
}
