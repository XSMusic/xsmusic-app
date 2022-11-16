import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { getYearsOld } from '@shared/utils';

@Component({
  selector: 'block-info-profile',
  templateUrl: 'block-info-profile.component.html',
  animations: [inOutAnimation],
})
export class BlockInfoProfileComponent {
  @Input() item: any;
  moreInfo = false;
  getYearsOld = getYearsOld;

  constructor(private fullImage: FullImageService, private router: Router) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  goToEdit(id: string) {
    this.router.navigate([routesConfig.clubAdmin.replace(':id', id)]);
  }

  goToFilter(key: string, value: string) {
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
