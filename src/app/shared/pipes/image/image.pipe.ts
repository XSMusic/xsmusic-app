import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';
import { Image } from '@models';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(images: Image[]): string {
    if (images.length > 0) {
      return `${environment.IMAGES_URL}/${images[0].url}`;
    } else {
      return 'assets/no-image.png';
    }
  }
}
