import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'artists-list-view',
  templateUrl: 'artists-list-view.component.html',
})
export class ArtistsListViewComponent {
  @Input() artists: any[] = [];
  @Output() goToProfile = new EventEmitter<string>();
}
