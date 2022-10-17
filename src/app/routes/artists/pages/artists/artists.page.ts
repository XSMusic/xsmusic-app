import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '@models';
import { artistMock } from '@shared/services/artist/artists.mock';

@Component({
  selector: 'artists',
  templateUrl: 'artists.page.html',
})
export class ArtistsPage implements OnInit {
  artists: Artist[] = [];
  view = 'gallery';
  constructor(private router: Router) {}

  ngOnInit() {
    this.setArtists();
  }

  setArtists() {
    this.artists = artistMock;
  }

  goToProfile(slug: string) {
    this.router.navigate(['artists/profile/', slug]);
  }
}
