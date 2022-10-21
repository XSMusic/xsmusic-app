import { Component, Input, OnInit } from '@angular/core';
import { ArtistService } from '@services';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { getYearsOld } from '@shared/utils/utils';

@Component({
  selector: 'artist-block-info',
  templateUrl: 'artist-block-info.component.html',
})
export class ArtistBlockInfoComponent implements OnInit {
  @Input() artist: any;
  information: { name: string; type?: string; value: any }[] = [];
  getYearsOld = getYearsOld;
  edit = false;

  constructor(private artistService: ArtistService) {}
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

  updateInfo() {
    const data = {
      _id: this.artist._id,
      name: this.artist.name,
      gender: this.artist.gender,
      birthdate: this.artist.birthdate,
      country: this.artist.country,
      styles: this.artist.styles!,
    };
    this.artistService.update(data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.edit = false;
        this.setInformation();
      },
      error: (err) => {},
    });
  }
}
