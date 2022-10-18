import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '@models';
import { ArtistService } from '@shared/services/api/artist/artist.service';

@Component({
  selector: 'artist-info-block',
  templateUrl: 'artist-info-block.component.html',
})
export class ArtistInfoBlockComponent implements OnInit {
  @Input() artist!: Artist;
  information: { name: string; type?: string; value: any }[] = [];
  constructor() {}

  ngOnInit() {
    this.setInformation();
  }

  setInformation() {
    this.information = [
      {
        name: 'Nombre',
        value: this.artist.name,
      },
      {
        name: 'Genero',
        type: 'gender',
        value: this.artist.gender,
      },
      {
        name: 'Pais',
        type: 'image',
        value: this.artist.country!,
      },
      {
        name: 'Estilos',
        type: 'array',
        value: this.artist.styles!,
      },
    ];
  }
}
