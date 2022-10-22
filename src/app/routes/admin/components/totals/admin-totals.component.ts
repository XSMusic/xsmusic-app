import { Component } from '@angular/core';

@Component({
  selector: 'admin-totals',
  templateUrl: 'admin-totals.component.html',
})
export class AdminTotalsComponent {
  totals = [
    { name: 'Artistas', value: 100, route: '/admin/artists' },
    { name: 'Estilos', value: 100, route: '/admin/styles' },
    { name: 'Sets', value: 200, route: '/admin/sets' },
    { name: 'Tracks', value: 50, route: '/admin/tracks' },
    { name: 'Clubs', value: 50, route: '/admin/clubs' },
    { name: 'Eventos', value: 50, route: '/admin/events' },
  ];
}
