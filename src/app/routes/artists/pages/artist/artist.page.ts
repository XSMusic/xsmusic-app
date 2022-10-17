import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'artist',
  templateUrl: 'artist.page.html',
})
export class ArtistPage implements OnInit {
  slug!: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug')!;
  }
}
