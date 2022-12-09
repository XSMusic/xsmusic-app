import { Pipe, PipeTransform } from '@angular/core';
import { imageArray } from '@shared/utils';

@Pipe({
  name: 'imageArray',
})
export class ImageArrayPipe implements PipeTransform {
  transform(images: any[], type: 'small' | 'medium' | 'big'): string {
    return imageArray(images, type);
  }
}
