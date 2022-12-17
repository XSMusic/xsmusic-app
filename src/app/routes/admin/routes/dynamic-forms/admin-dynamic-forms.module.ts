import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminDynamicFormsPage } from './pages/dynamic-forms/admin-dynamic-forms.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminDynamicFormsPage,
        data: { breadcrumb: '', title: 'Admin - Config' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminDynamicFormsPage],
  providers: [],
})
export class AdminDynamicFormsModule {}
