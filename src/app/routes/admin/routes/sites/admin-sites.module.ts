import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminSitePage } from './pages/site/admin-site.page';
import { AdminSitesPage } from './pages/sites/admin-sites.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'clubs',
        component: AdminSitesPage,
        data: { breadcrumb: '', title: 'Admin - Clubs' },
      },
      {
        path: 'clubs/:id',
        component: AdminSitePage,
        data: { breadcrumb: '', title: 'Admin - Editar Club' },
      },
      {
        path: 'festivals',
        component: AdminSitesPage,
        data: { breadcrumb: '', title: 'Admin - Festivales' },
      },
      {
        path: 'festivals/:id',
        component: AdminSitePage,
        data: { breadcrumb: '', title: 'Admin - Editar Festival' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminSitesPage, AdminSitePage],
  providers: [],
})
export class AdminSitesModule {}
