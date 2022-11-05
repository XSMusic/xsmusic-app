import { Component, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { StatsService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'admin-totals',
  templateUrl: 'admin-totals.component.html',
  animations: [inOutAnimation],
})
export class AdminTotalsComponent implements OnInit {
  totals = [
    {
      id: 'artists',
      name: 'Artistas',
      value: 0,
      percentages: [{ days: '', value: 0 }],
      route: '/admin/artists',
      icon: 'user-dj',
    },
    {
      id: 'clubs',
      name: 'Clubs',
      value: 0,
      percentages: [],
      route: '/admin/clubs',
      icon: '',
    },
    {
      id: 'styles',
      name: 'Estilos',
      value: 0,
      percentages: [],
      route: '/admin/styles',
      icon: '',
    },
    {
      id: 'events',
      name: 'Eventos',
      value: 0,
      percentages: [],
      route: '/admin/events',
      icon: 'calendar',
    },
    {
      id: 'sets',
      name: 'Sets',
      value: 0,
      percentages: [],
      route: '/admin/media/sets',
      icon: 'sets',
    },
    {
      id: 'tracks',
      name: 'Tracks',
      value: 0,
      percentages: [],
      route: '/admin/media/tracks',
      icon: '',
    },

    {
      id: 'users',
      name: 'Usuarios',
      value: 0,
      percentages: [],
      route: '/admin/users',
      icon: 'users',
    },
  ];
  endSlice = 2;
  loading = true;

  constructor(
    private statsService: StatsService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getStats();
  }

  getStats() {
    this.loading = true;
    this.statsService.getForAdmin().subscribe({
      next: (response: any) => {
        for (const total of this.totals) {
          total.value = response[total.id].total;
          total.percentages = response[total.id].percentages;
          this.loading = false;
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
