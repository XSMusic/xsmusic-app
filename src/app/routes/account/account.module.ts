import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { AccountEditPage } from './pages/edit/account-edit.page';
import { routesConfig } from '../../core/config/routes.config';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: routesConfig.edit, pathMatch: 'full' },
      {
        path: routesConfig.edit,
        component: AccountEditPage,
        data: { breadcrumb: 'Login', title: 'Login' },
      },

    ]),
  ],
  exports: [],
  declarations: [AccountEditPage],
  providers: [],
})
export class AccountModule {}
