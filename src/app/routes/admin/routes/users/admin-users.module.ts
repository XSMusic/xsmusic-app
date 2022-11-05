import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminUserOneComponent } from './components/admin-user-one/admin-user-one.component';
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
        path: 'one/:id',
        component: AdminUserPage,
        data: { breadcrumb: '', title: 'Admin - Editar Usuario' },
      },
      {
        path: 'one',
        component: AdminUserPage,
        data: { breadcrumb: '', title: 'Admin - Nuevo Usuario' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminUsersPage, AdminUserPage, AdminUserOneComponent],
  providers: [],
})
export class AdminUsersModule {}
