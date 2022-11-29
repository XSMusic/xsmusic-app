import { NgModule } from '@angular/core';
import { AdminDashboardPage } from './routes/dashboard/admin-dashboard.page';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { AdminTotalsComponent } from '../../shared/components/ui/totals/admin-totals.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '*', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: AdminDashboardPage,
        data: { breadcrumb: '', title: 'Admin' },
      },
      {
        path: 'artists',
        data: { breadcrumb: 'Artistas' },
        loadChildren: () =>
          import('./routes/artists/admin-artists.module').then(
            (m) => m.AdminArtistsModule
          ),
      },
      {
        path: 'events',
        data: { breadcrumb: 'Eventos' },
        loadChildren: () =>
          import('./routes/events/admin-events.module').then(
            (m) => m.AdminEventsModule
          ),
      },
      {
        path: 'images',
        data: { breadcrumb: 'Imagenes' },
        loadChildren: () =>
          import('./routes/images/admin-images.module').then(
            (m) => m.AdminImagesModule
          ),
      },
      {
        path: 'sites',
        data: { breadcrumb: 'Sitios' },
        loadChildren: () =>
          import('./routes/sites/admin-sites.module').then(
            (m) => m.AdminSitesModule
          ),
      },
      {
        path: 'styles',
        data: { breadcrumb: 'Estilos' },
        loadChildren: () =>
          import('./routes/styles/admin-styles.module').then(
            (m) => m.AdminStylesModule
          ),
      },
      {
        path: 'media',
        data: { breadcrumb: 'Media' },
        loadChildren: () =>
          import('./routes/media/admin-media.module').then(
            (m) => m.AdminMediaModule
          ),
      },
      {
        path: 'users',
        data: { breadcrumb: 'Usuarios' },
        loadChildren: () =>
          import('./routes/users/admin-users.module').then(
            (m) => m.AdminUsersModule
          ),
      },
      {
        path: 'github',
        data: { breadcrumb: 'Github' },
        loadChildren: () =>
          import('./routes/github/admin-github.module').then(
            (m) => m.AdminGithubModule
          ),
      },
    ]),
  ],
  exports: [],
  declarations: [AdminDashboardPage, AdminTotalsComponent],
  providers: [],
})
export class AdminModule {}
