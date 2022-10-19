import { Component, Input, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist } from '@models';
import { artistMock } from '@shared/services/api/artist/artists.mock';

@Component({
  selector: 'app-last-artists-block',
  templateUrl: 'last-artists-block.component.html',
  animations: [inOutAnimation]
})
export class LastArtistsBlockComponent implements OnInit {
  @Input() artists?: Artist[] = artistMock;
  constructor() {}

  ngOnInit() {}
}
