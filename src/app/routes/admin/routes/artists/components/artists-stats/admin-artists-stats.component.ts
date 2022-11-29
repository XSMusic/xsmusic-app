import { Component, OnInit } from '@angular/core';
import { StatsService, ToastService, TOAST_STATE } from '@services';
import { StatsArtistsI } from '@shared/services/api/stats/stats.interface';

@Component({
  selector: 'admin-artists-stats',
  templateUrl: 'admin-artists-stats.component.html',
})
export class AdminArtistsStatsComponent implements OnInit {
  stats: StatsArtistsI = {
    topSocial: [],
  };
  constructor(
    private statsService: StatsService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getStats();
  }

  getStats() {
    this.statsService.getStatsArtists().subscribe({
      next: (response) => {
        this.stats = response;
      },
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }
}
