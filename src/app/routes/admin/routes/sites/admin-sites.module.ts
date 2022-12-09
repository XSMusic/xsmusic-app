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
        data: { breadcrumb: '', title: 'Admin - Sitios' },
      },
      {
        path: 'clubs/:id',
        component: AdminSitePage,
        data: { breadcrumb: '', title: 'Admin - Editar sitio' },
      },
      {
        path: 'festivals',
        component: AdminSitesPage,
        data: { breadcrumb: '', title: 'Admin - Usuarios' },
      },
      {
        path: 'festivals/:id',
        component: AdminSitePage,
        data: { breadcrumb: '', title: 'Admin - Editar Usuario' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminSitesPage, AdminSitePage, AdminSiteOneComponent],
  providers: [],
})
export class AdminSitesModule {}
