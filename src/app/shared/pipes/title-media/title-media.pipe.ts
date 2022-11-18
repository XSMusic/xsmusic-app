import { Pipe, PipeTransform } from '@angular/core';
import { Media } from '@models';
import { getTitleMedia } from '@shared/utils';

@Pipe({
  name: 'titleMedia',
})
export class TitleMediaPipe implements PipeTransform {
  transform(item: Media): any {
    return getTitleMedia(item);
  }
}
