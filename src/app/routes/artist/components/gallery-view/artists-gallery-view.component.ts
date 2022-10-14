import { Component, Input } from '@angular/core';

@Component({
  selector: 'artists-gallery-view',
  templateUrl: 'artists-gallery-view.component.html',
})
export class ArtistsGalleryViewComponent {
  @Input() artists: any[] = [];
}
