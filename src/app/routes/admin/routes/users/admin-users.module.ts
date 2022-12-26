import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminUserPage } from './pages/user/admin-user.page';
import { AdminUsersPage } from './pages/users/admin-users.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminUsersPage,
        data: { breadcrumb: '', title: 'Admin - Usuarios' },
      },
      {
        path: ':id',
        component: AdminUserPage,
        data: { breadcrumb: '', title: 'Admin - Editar Usuario' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminUsersPage, AdminUserPage],
  providers: [],
})
export class AdminUsersModule {}
