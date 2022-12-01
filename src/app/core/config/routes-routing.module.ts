import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  { path: '*', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    data: { breadcrumb: 'Inicio' },
    loadChildren: () =>
      import('../../routes/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'artists',
    data: { breadcrumb: 'Artistas' },
    loadChildren: () =>
      import('../../routes/artist/artist.module').then((m) => m.ArtistModule),
  },

  {
    path: 'clubs',
    data: { breadcrumb: 'Clubs' },
    loadChildren: () =>
      import('../../routes/club/club.module').then((m) => m.ClubsModule),
  },
  {
    path: 'events',
    data: { breadcrumb: 'Eventos' },
    loadChildren: () =>
      import('../../routes/event/event.module').then((m) => m.EventModule),
  },
  {
    path: 'festivals',
    data: { breadcrumb: 'Festivales' },
    loadChildren: () =>
      import('../../routes/festival/festivals.module').then(
        (m) => m.FestivalsModule
      ),
  },
  {
    path: 'tracks',
    data: { breadcrumb: 'Tracks' },
    loadChildren: () =>
      import('../../routes/tracks/tracks.module').then((m) => m.TracksModule),
  },
  {
    path: 'sets',
    data: { breadcrumb: 'Sets' },
    loadChildren: () =>
      import('../../routes/set/set.module').then((m) => m.SetModule),
  },
  {
    path: 'search',
    data: { breadcrumb: 'Buscador' },
    loadChildren: () =>
      import('../../routes/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'auth',
    data: { breadcrumb: '' },
    loadChildren: () =>
      import('../../routes/auth/auth.module').then((m) => m.ArtistsModule),
  },
  {
    path: 'account',
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
