import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '@models';
import { imageArray } from '@shared/utils';

@Pipe({
  name: 'imageArray',
})
export class ImageArrayPipe implements PipeTransform {
  transform(images: Image[], type: 'small' | 'medium' | 'big'): string {
    return imageArray(images, type);
  }
}
