import { NgModule } from '@angular/core';
import { AdminPage } from './pages/admin.page';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { AdminTotalsComponent } from './components/totals/admin-totals.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminPage,
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
    ]),
  ],
  exports: [],
  declarations: [AdminPage, AdminTotalsComponent],
  providers: [],
})
export class AdminModule {}
