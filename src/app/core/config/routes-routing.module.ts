import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routesConfig } from '@config';

const routes: Routes = [
  { path: '*', redirectTo: routesConfig.home, pathMatch: 'full' },
  { path: '', redirectTo: routesConfig.home, pathMatch: 'full' },
  {
    path: routesConfig.home,
    data: { breadcrumb: 'Inicio' },
    loadChildren: () =>
      import('../../routes/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: routesConfig.artists,
    data: { breadcrumb: 'Artistas' },
    loadChildren: () =>
      import('../../routes/artists/artists.module').then(
        (m) => m.ArtistsModule
      ),
  },
  {
    path: routesConfig.clubs,
    data: { breadcrumb: 'Clubs' },
    loadChildren: () =>
      import('../../routes/clubs/clubs.module').then((m) => m.ClubsModule),
  },
  {
    path: routesConfig.tracks,
    data: { breadcrumb: 'Temas' },
    loadChildren: () =>
      import('../../routes/tracks/tracks.module').then((m) => m.TracksModule),
  },
  {
    path: routesConfig.sets,
    data: { breadcrumb: 'Sets' },
    loadChildren: () =>
      import('../../routes/sets/sets.module').then((m) => m.SetsModule),
  },
  {
    path: routesConfig.search,
    data: { breadcrumb: 'Buscador' },
    loadChildren: () =>
      import('../../routes/search/search.module').then((m) => m.SearchModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [],
  declarations: [],
  providers: [],
})
export class RoutesRoutingModule {}
