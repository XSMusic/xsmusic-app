import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routesConfig } from '@config';
import { NgxPermissionsGuard } from 'ngx-permissions';

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
  {
    path: routesConfig.auth,
    data: { breadcrumb: '' },
    loadChildren: () =>
      import('../../routes/auth/auth.module').then((m) => m.ArtistsModule),
  },
  {
    path: routesConfig.account,
    data: {
      breadcrumb: 'auth',
      permissions: {
        only: ['USER', 'ADMIN'],
      },
    },
    loadChildren: () =>
      import('../../routes/account/account.module').then(
        (m) => m.AccountModule
      ),
    canActivate: [NgxPermissionsGuard],
  },

  {
    path: 'admin',
    data: {
      breadcrumb: 'Admin',
      permissions: {
        only: 'ADMIN',
      },
    },
    loadChildren: () =>
      import('../../routes/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [NgxPermissionsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [],
  declarations: [],
  providers: [],
})
export class RoutesRoutingModule {}
