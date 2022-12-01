import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  { path: '*', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    data: {
      description: 'Musica electronica, hecha para ti',
      title: 'XSMusic',
    },
    loadChildren: () =>
      import('../../routes/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'artists',
    loadChildren: () =>
      import('../../routes/artist/artist.module').then((m) => m.ArtistModule),
  },
  {
    path: 'clubs',
    loadChildren: () =>
      import('../../routes/club/club.module').then((m) => m.ClubsModule),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('../../routes/event/event.module').then((m) => m.EventModule),
  },
  {
    path: 'festivals',
    loadChildren: () =>
      import('../../routes/festival/festivals.module').then(
        (m) => m.FestivalsModule
      ),
  },
  {
    path: 'tracks',
    loadChildren: () =>
      import('../../routes/tracks/tracks.module').then((m) => m.TracksModule),
  },
  {
    path: 'sets',
    loadChildren: () =>
      import('../../routes/set/set.module').then((m) => m.SetModule),
  },
  {
    path: 'search',
    data: {},
    loadChildren: () =>
      import('../../routes/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'auth',
    data: {},
    loadChildren: () =>
      import('../../routes/auth/auth.module').then((m) => m.ArtistsModule),
  },
  {
    path: 'account',
    data: {
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
