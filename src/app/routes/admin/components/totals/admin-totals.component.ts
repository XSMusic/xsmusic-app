import { Component, OnInit } from '@angular/core';
import { StatsService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'admin-totals',
  templateUrl: 'admin-totals.component.html',
})
export class AdminTotalsComponent implements OnInit {
  totals = [
    { id: 'artists', name: 'Artistas', value: 0, route: '/admin/artists' },
    { id: 'styles', name: 'Estilos', value: 0, route: '/admin/styles' },
    { id: 'sets', name: 'Sets', value: 0, route: '/admin/media/sets' },
    { id: 'tracks', name: 'Tracks', value: 0, route: '/admin/media/tracks' },
    { id: 'clubs', name: 'Clubs', value: 0, route: '/admin/clubs' },
    { id: 'events', name: 'Eventos', value: 0, route: '/admin/events' },
    { id: 'users', name: 'Usuarios', value: 0, route: '/admin/users' },
  ];
  endSlice = 2;

  constructor(
    private statsService: StatsService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getStats();
  }

  getStats() {
    this.statsService.getForAdmin().subscribe({
      next: (response: any) => {
        for (const total of this.totals) {
          total.value = response[total.id];
        }
      },
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }

  viewMoreTotals() {
    if (this.endSlice === 2) {
      this.endSlice = this.totals.length;
    } else {
      this.endSlice = 2;
    }
  }
}
