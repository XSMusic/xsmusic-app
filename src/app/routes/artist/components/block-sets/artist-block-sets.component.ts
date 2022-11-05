import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { Artist, Media } from '@models';

@Component({
  selector: 'artist-block-sets',
  templateUrl: './artist-block-sets.component.html',
})
export class ArtistBlockSetsComponent implements OnInit {
  @Input() artist!: Artist;
  @Input() type = 'set';
  items: Media[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.type === 'set') {
      this.items = this.artist.sets;
    } else {
      this.items = this.artist.tracks;
    }
    console.log(this.type, this.items.length);
  }

  goTo(item: Media) {
    this.router.navigate([routesConfig.set.replace(':id', item._id!)]);
  }
}
