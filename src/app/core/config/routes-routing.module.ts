import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routesConfig } from '@config';

const routes: Routes = [
  { path: '*', redirectTo: routesConfig.home, pathMatch: 'full' },
  { path: '', redirectTo: routesConfig.home, pathMatch: 'full' },
  {
    path: routesConfig.home,
    data: { breadcrumb: 'Inicio' },
    loadChildren: () => import('../../routes/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: routesConfig.artists,
    data: { breadcrumb: 'Artistas' },
    loadChildren: () =>
      import('../../routes/artists/artists.module').then((m) => m.ArtistsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [],
  declarations: [],
  providers: [],
})
export class RoutesRoutingModule {}
