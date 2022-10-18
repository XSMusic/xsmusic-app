import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist } from '@models';
import { artistMock } from '@shared/services/api/artist/artists.mock';

@Component({
  selector: 'artists',
  templateUrl: 'artists.page.html',
  animations: [inOutAnimation],
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

  changeView(view: string) {
    this.view = view;
  }
}
