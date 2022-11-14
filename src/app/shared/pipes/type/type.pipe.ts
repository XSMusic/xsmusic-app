import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type',
})
export class TypePipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'artist') {
      return 'Artista';
    } else if (value === 'media') {
      return 'Set/Track';
    } else if (value === 'site') {
      return 'Club/Festival';
    } else if (value === 'user') {
      return 'Usuario';
    } else {
      return '';
    }
  }
}
