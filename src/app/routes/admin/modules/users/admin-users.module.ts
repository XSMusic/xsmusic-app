import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminUsersPage } from './pages/admin-users.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminUsersPage,
        data: { breadcrumb: 'Estilos', title: 'Estilos' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminUsersPage],
  providers: [],
})
export class AdminUsersModule {}
