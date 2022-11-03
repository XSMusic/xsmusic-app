import { Component, Input } from '@angular/core';
import { Artist } from '@models';

@Component({
  selector: 'artist-block-sets',
  templateUrl: './artist-block-sets.component.html',
})
export class ArtistBlockSetsComponent {
  @Input() artist!: Artist;
}
