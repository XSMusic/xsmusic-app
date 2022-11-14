import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';
import { Image } from '@models';
import { randomNumber } from '@shared/utils';

@Pipe({
  name: 'randomImage',
})
export class RandomImagePipe implements PipeTransform {
  transform(images: Image[]): string {
    if (images) {
      if (images.length > 0) {
        return `${environment.IMAGES_URL}/${
          images[randomNumber(images.length - 1, 0)].url
        }`;
      } else {
        return `${environment.IMAGES_URL}/${images[0].url}`;
      }
    } else {
      return 'assets/no-image.png';
    }
  }
}
