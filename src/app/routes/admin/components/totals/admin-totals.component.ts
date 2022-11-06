import { Component, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { StatsService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { AdminTotalsItemI } from './admin-totals.interface';

@Component({
  selector: 'admin-totals',
  templateUrl: 'admin-totals.component.html',
  animations: [inOutAnimation],
})
export class AdminTotalsComponent implements OnInit {
  totals: AdminTotalsItemI[] = [];
  endSlice = 2;
  loading = true;

  constructor(
    private statsService: StatsService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.setInitTotals();
    this.getStats();
  }

  setInitTotals() {
    this.totals = [
      {
        id: 'artists',
        name: 'Artistas',
        value: 0,
        percentages: [{ days: '', value: 0 }],
        route: routesConfig.artistsAdmin,
      },
      {
        id: 'clubs',
        name: 'Clubs',
        value: 0,
        percentages: [],
        route: routesConfig.clubsAdmin,
      },
      {
        id: 'styles',
        name: 'Estilos',
        value: 0,
        percentages: [],
        route: routesConfig.stylesAdmin,
      },
      {
        id: 'events',
        name: 'Eventos',
        value: 0,
        percentages: [],
        route: '/admin/events',
      },
      {
        id: 'events',
        name: 'Festivales',
        value: 0,
        percentages: [],
        route: routesConfig.festivalsAdmin
      },
      {
        id: 'sets',
        name: 'Sets',
        value: 0,
        percentages: [],
        route: routesConfig.setsAdmin,
      },
      {
        id: 'tracks',
        name: 'Tracks',
        value: 0,
        percentages: [],
        route: routesConfig.tracksAdmin,
      },
      {
        id: 'users',
        name: 'Usuarios',
        value: 0,
        percentages: [],
        route: routesConfig.usersAdmin,
      },
    ];

    this.totals = this.totals.sort((a: any, b: any) => {
      if (a.total > b.total) {
        return -1;
      } else if (b.total > a.total) {
        return 1;
      } else {
        return 0;
      }
    });
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
