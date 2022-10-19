import { NgModule } from '@angular/core';
import { AdminPage } from './pages/admin.page';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminPage,
        data: { breadcrumb: '', title: 'Admin' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminPage],
  providers: [],
})
export class AdminModule {}
