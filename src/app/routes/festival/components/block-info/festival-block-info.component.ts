import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Site } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';

@Component({
  selector: 'festival-block-info',
  templateUrl: 'festival-block-info.component.html',
  animations: [inOutAnimation],
})
export class FestivalBlockInfoComponent {
  @Input() site: Site = new Site();
  viewMore = false;
  moreInfo = false;

  constructor(private fullImage: FullImageService, private router: Router) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  goToEdit(id: string) {
    this.router.navigate([routesConfig.festivalAdmin.replace(':id', id)]);
  }

  goToFilter(key: string, value: string) {
    this.router.navigate([
      routesConfig.festivalsFilter
        .replace(':filterKey', key)
        .replace(':filterValue', value),
    ]);
  }

  goToSocial(type: string) {
    window.open(type, '_black');
  }
}
