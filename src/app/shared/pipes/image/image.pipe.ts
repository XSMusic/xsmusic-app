import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';
import { Image } from '@models';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(image: Image): string {
    console.log(image);
    if (image) {
      return `${environment.IMAGES_URL}/${image.url}`;
    } else {
      return 'assets/no-image.png';
    }
  }
}
