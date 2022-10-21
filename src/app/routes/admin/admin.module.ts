import { NgModule } from '@angular/core';
import { AdminPage } from './pages/admin.page';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { routesConfig } from '@core/config';

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
        path: routesConfig.styles,
        data: { breadcrumb: '' },
        loadChildren: () =>
          import('./modules/styles/admin-styles.module').then(
            (m) => m.AdminStylesModule
          ),
      },
      {
        path: routesConfig.users,
        data: { breadcrumb: '' },
        loadChildren: () =>
          import('./modules/users/admin-users.module').then(
            (m) => m.AdminUsersModule
          ),
      },
    ]),
  ],
  exports: [],
  declarations: [AdminPage],
  providers: [],
})
export class AdminModule {}
