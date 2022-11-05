import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { StatsGetTopArtistsResponseI } from '@interfaces';
import { StatsService } from '@services';

@Component({
  selector: 'top-countries',
  templateUrl: './top-countries.component.html',
})
export class TopCountriesComponent implements OnInit {
  countries: StatsGetTopArtistsResponseI[] = [];
  error = false;
  loading = true;
  constructor(private statsService: StatsService, private router: Router) {}

  ngOnInit(): void {
    this.getTopArtist();
  }

  getTopArtist() {
    this.statsService.getTopArtists({ type: 'country', limit: 7 }).subscribe({
      next: (response) => {
        this.countries = response;
      },
      error: () => (this.error = true),
    });
  }

  goToFilter(countryCode: string) {
    this.router.navigate([
      routesConfig.artistsFilter
        .replace(':filterKey', 'country')
        .replace(':filterValue', countryCode),
    ]);
  }
}
