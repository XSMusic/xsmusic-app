import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminClubOneComponent } from './components/admin-club-one/admin-club-one.component';
import { AdminClubPage } from './pages/club/admin-club.page';
import { AdminClubsPage } from './pages/clubs/admin-clubs.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminClubsPage,
        data: { breadcrumb: '', title: 'Admin - Usuarios' },
      },
      {
        path: 'one/:id',
        component: AdminClubPage,
        data: { breadcrumb: '', title: 'Admin - Editar Usuario' },
      },
      {
        path: 'one',
        component: AdminClubPage,
        data: { breadcrumb: '', title: 'Admin - Nuevo Usuario' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminClubsPage, AdminClubPage, AdminClubOneComponent],
  providers: [],
})
export class AdminClubsModule {}
