import { Component, Input } from '@angular/core';
import { Artist } from '@models';

@Component({
  selector: 'artist-last-media',
  templateUrl: './artist-last-media.component.html',
})
export class ArtistLastMediaComponent {
  @Input() views: any[] = [];
  @Input() artist!: Artist;
  view = 'set';
}
