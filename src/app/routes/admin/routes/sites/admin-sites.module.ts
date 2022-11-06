import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminSiteOneComponent } from './components/admin-site-one/admin-site-one.component';
import { AdminSitePage } from './pages/site/admin-site.page';
import { AdminSitesPage } from './pages/sites/admin-sites.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'clubs',
        component: AdminSitesPage,
        data: { breadcrumb: '', title: 'Admin - Usuarios' },
      },
      {
        path: 'clubs/one/:id',
        component: AdminSitePage,
        data: { breadcrumb: '', title: 'Admin - Editar Usuario' },
      },
      {
        path: 'clubs/one',
        component: AdminSitePage,
        data: { breadcrumb: '', title: 'Admin - Nuevo Usuario' },
      },
      {
        path: 'festivals',
        component: AdminSitesPage,
        data: { breadcrumb: '', title: 'Admin - Usuarios' },
      },
      {
        path: 'festivals/one/:id',
        component: AdminSitePage,
        data: { breadcrumb: '', title: 'Admin - Editar Usuario' },
      },
      {
        path: 'festivals/one',
        component: AdminSitePage,
        data: { breadcrumb: '', title: 'Admin - Nuevo Usuario' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminSitesPage, AdminSitePage, AdminSiteOneComponent],
  providers: [],
})
export class AdminSitesModule {}
