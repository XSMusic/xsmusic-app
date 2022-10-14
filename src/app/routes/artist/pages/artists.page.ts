import { Component, OnInit } from '@angular/core';
import { Artist } from '@models';
import { artistMock } from '@shared/services/artist/artists.mock';

@Component({
  selector: 'artists',
  templateUrl: 'artists.page.html',
})
export class ArtistsPage implements OnInit {
  artists: Artist[] = [];
  view = 'list';

  ngOnInit() {
    this.setArtists();
  }

  setArtists() {
    this.artists = artistMock;
  }
}
