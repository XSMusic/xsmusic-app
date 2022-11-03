import { Component, Input } from '@angular/core';
import { Artist } from '@models';

@Component({
  selector: 'artist-block-tracks',
  templateUrl: './artist-block-tracks.component.html',
})
export class ArtistBlockTracksComponent {
  @Input() artist!: Artist;
}
