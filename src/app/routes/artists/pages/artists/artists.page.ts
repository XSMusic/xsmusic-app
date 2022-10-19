import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist } from '@models';
import { ArtistsGetAllBodyI } from '@shared/services/api/artist/artist.interface';
import { ArtistService } from '@shared/services/api/artist/artist.service';

@Component({
  selector: 'artists',
  templateUrl: 'artists.page.html',
  animations: [inOutAnimation],
})
export class ArtistsPage implements OnInit {
  artists: Artist[] = [];
  view = 'gallery';
  filtered = false;
  body: ArtistsGetAllBodyI = {
    page: 1,
    limit: 20,
    filter: [],
  };
  constructor(private router: Router, private artistService: ArtistService) {}

  ngOnInit() {
    this.getArtists();
  }

  getArtists() {
    this.artistService.getAll().subscribe({
      next: (response) => {
        this.artists = response;
        this.filtered = this.body.filter.length > 0;
      },
    });
  }

  goToProfile(slug: string) {
    this.router.navigate(['artists/profile/', slug]);
  }

  changeView(view: string) {
    this.view = view;
  }

  filter(event: { name: string; value: string }) {
    this.body.filter = [event.name, event.value];
    this.getArtists();
  }

  removeFilter() {
    this.body.filter = [];
    this.getArtists();

  }
}
