import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '@models';
import { getYearsOld } from '@shared/utils/utils';

@Component({
  selector: 'artist-block-info',
  templateUrl: 'artist-block-info.component.html',
})
export class ArtistBlockInfoComponent implements OnInit {
  @Input() artist: Artist = new Artist();
  information: { name: string; type?: string; value: any }[] = [];
  getYearsOld = getYearsOld;
  edit = false;

  ngOnInit() {
    this.setInformation();
  }

  setInformation() {
    this.information = [
      {
        name: 'Nombre',
        type: 'name',
        value: this.artist.name,
      },
      {
        name: 'Genero',
        type: 'gender',
        value: this.artist.gender,
      },
      {
        name: 'F. Nacimiento',
        type: 'birthdate',
        value: this.artist.birthdate,
      },
      {
        name: 'Pais',
        type: 'country',
        value: this.artist.country,
      },
      {
        name: 'Estilos',
        type: 'styles',
        value: this.artist.styles!,
      },
    ];
  }
}
