import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type',
})
export class TypePipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'artist') {
      return 'Artista';
    } else if (value === 'club') {
      return 'Club';
    } else if (value === 'event') {
      return 'Evento';
    } else if (value === 'festival') {
      return 'Festival';
    } else if (value === 'media') {
      return 'Set/Track';
    } else if (value === 'site') {
      return 'Club/Festival';
    } else if (value === 'set') {
      return 'Set';
    } else if (value === 'track') {
      return 'Track';
    } else if (value === 'user') {
      return 'Usuario';
    } else {
      return '';
    }
  }
}
