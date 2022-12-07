import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'block-stats',
  templateUrl: 'block-stats.component.html',
})
export class BlockStatsComponent implements OnInit {
  @Input() type!: 'topCountries' | 'topSocial' | 'topStyles';
  @Input() items!: any;
  title = '';

  ngOnInit(): void {
    if (this.type === 'topCountries') {
      this.title = 'Top Paises';
    } else if (this.type === 'topSocial') {
      this.title = 'Top Redes sociales';
    } else if (this.type === 'topStyles') {
      this.title = 'Top Estilos';
    }
  }
}
