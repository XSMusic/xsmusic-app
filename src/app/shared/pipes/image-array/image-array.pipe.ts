import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';
import { Image } from '@models';

@Pipe({
  name: 'imageArray',
})
export class ImageArrayPipe implements PipeTransform {
  transform(images: Image[], type?: 'small' | 'medium' | 'big'): string {
    if (images && images.length > 0) {
      return `${environment.urls.images}/${images[0].type}s/${type}/${images[0].url}`;
    } else {
      return 'assets/no-image.png';
    }
  }
}
