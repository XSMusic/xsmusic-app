// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { inOutAnimation } from '@core/animations/enter-leave.animations';
// import { routesConfig } from '@core/config';
// import { StatsGetTopArtistsI } from '@interfaces';
// import { StatsService } from '@services';

// @Component({
//   selector: 'top-countries',
//   templateUrl: './top-countries.component.html',
//   animations: [inOutAnimation],
// })
// export class TopCountriesComponent implements OnInit {
//   countries: StatsGetTopArtistsI[] = [];
//   error = false;
//   loading = true;
//   constructor(private statsService: StatsService, private router: Router) {}

//   ngOnInit(): void {
//     this.getTopArtist();
//   }

//   getTopArtist() {
//     this.statsService.getTopArtists({ type: 'country', limit: 7 }).subscribe({
//       next: (response) => {
//         this.countries = response;
//         this.loading = false;
//       },
//       error: () => (this.error = true),
//     });
//   }

//   goToFilter(countryCode: string) {
//     this.router.navigate([
//       routesConfig.artistsFilter
//         .replace(':filterKey', 'country')
//         .replace(':filterValue', countryCode),
//     ]);
//   }
// }
