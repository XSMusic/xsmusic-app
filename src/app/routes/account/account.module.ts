import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { AccountEditPage } from './pages/edit/account-edit.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
      {
        path: 'edit',
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
