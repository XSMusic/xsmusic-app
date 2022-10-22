import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetAllDto } from '@interfaces';
import { Artist } from '@models';
import { ArtistService } from '@services';

@Component({
  selector: 'page-admin-artists',
  templateUrl: 'admin-artists.page.html',
})
export class AdminArtistsPage {
  artists: Artist[] = [];
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
  };
  loading = true;
  error = false;
  constructor(private router: Router, private artistService: ArtistService) {}

  ngOnInit() {
    this.getArtists();
  }

  getArtists(more = false) {
    this.artistService.getAll(this.body).subscribe({
      next: (response) => {
        if (!more) {
          this.artists = response.items;
        } else {
          this.artists = this.artists.concat(response.items);
        }
        this.loading = false;
        this.error = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  goToProfile(slug: string) {
    this.router.navigate(['artists/profile/', slug]);
  }

  filter(event: { name: string; value: string }) {
    console.log(event);
    this.body.filter = [event.name, event.value];
    this.getArtists();
  }

  removeFilter() {
    this.body.filter = [];
    this.getArtists();
  }

  onScroll() {
    this.body.page++;
    this.getArtists(true);
  }
}
