import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '@models';
import { artistMock } from '../../../services/api/artist/artists.mock';

@Component({
  selector: 'app-last-artists-block',
  templateUrl: 'last-artists-block.component.html',
})
export class LastArtistsBlockComponent implements OnInit {
  @Input() artists?: Artist[] = artistMock;
  constructor() {}

  ngOnInit() {}
}
