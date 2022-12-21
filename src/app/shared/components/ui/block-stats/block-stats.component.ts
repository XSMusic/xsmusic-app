import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'block-stats',
  templateUrl: 'block-stats.component.html',
})
export class BlockStatsComponent implements OnInit {
  @Input() type!:
    | 'topCountries'
    | 'topSocial'
    | 'topStates'
    | 'topStyles'
    | 'topVarious';
  @Input() items!: any;
  title = '';

  ngOnInit(): void {
    if (this.type === 'topCountries') {
      this.title = 'Top Paises';
    } else if (this.type === 'topSocial') {
      this.title = 'Top Redes sociales';
    } else if (this.type === 'topStyles') {
      this.title = 'Top Estilos';
    } else if (this.type === 'topStates') {
      this.title = 'Top Comunidades';
    } else if (this.type === 'topVarious') {
      this.title = 'Varios';
    }
  }
}
