import { Pipe, PipeTransform } from '@angular/core';
import { Media } from '@models';

@Pipe({
  name: 'titleMedia',
})
export class TitleMediaPipe implements PipeTransform {
  transform(item: Media): any {
    let title = '';
    item.artists!.forEach((artist, i) => {
      if (i !== 0) {
        title += ' & ';
      }
      title += artist.name;
    });
    if (item.site.name !== 'Desconocido') {
      title += ` @  ${item.site.name}`;
    } else {
      title += ` @  ${item.name}`;
    }
    if (item.year !== 0) {
      title += ' ' + item.year;
    }
    return title;
  }
}
