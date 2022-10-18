import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist } from '@models';
import { ArtistService } from '@shared/services/api/artist/artist.service';
import { artistMock } from '@shared/services/api/artist/artists.mock';

@Component({
  selector: 'artist',
  templateUrl: 'artist.page.html',
  animations: [inOutAnimation],
})
export class ArtistPage implements OnInit {
  artist!: Artist;
  artists: Artist[] = artistMock;
  slug!: string;
  information: { name: string; type?: string; value: any }[] = [];
  viewMore = false;
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.getArtist();
  }

  getArtist() {
    this.artistService.getOneBySlug(this.slug).subscribe({
      next: (artist) => {
        this.artist = artist;
      },
      error: (error: any) => {},
    });
  }
}
