import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'artists-gallery-view',
  templateUrl: 'artists-gallery-view.component.html',
})
export class ArtistsGalleryViewComponent {
  @Input() artists: any[] = [];
  @Output() goToProfile = new EventEmitter<string>();
}
