import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '@models';

@Component({
  selector: 'artist-block-info',
  templateUrl: 'artist-block-info.component.html',
})
export class ArtistBlockInfoComponent implements OnInit {
  @Input() artist!: Artist;
  information: { name: string; type?: string; value: any }[] = [];

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
