import { Component } from '@angular/core';
import { GenericListBase } from '@components';

@Component({
  selector: 'artists',
  template: `<generic-list-base type="artist"></generic-list-base>`,
})
export class ArtistsPage extends GenericListBase {}
