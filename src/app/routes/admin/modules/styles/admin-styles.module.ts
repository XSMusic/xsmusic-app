import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminStylesPage } from './pages/admin-styles.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminStylesPage,
        data: { breadcrumb: 'Estilos', title: 'Estilos' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminStylesPage],
  providers: [],
})
export class AdminStylesModule {}
