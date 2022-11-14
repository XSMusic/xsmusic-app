import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminImagesPage } from './pages/admin-images.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminImagesPage,
        data: { breadcrumb: '', title: 'Admin - Imagenes' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminImagesPage],
  providers: [],
})
export class AdminImagesModule {}
