import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminStylePage } from './pages/style/admin-style.page';
import { AdminStylesPage } from './pages/styles/admin-styles.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminStylesPage,
        data: { breadcrumb: '', title: 'Admin - Estilos' },
      },
      {
        path: 'one/:id',
        component: AdminStylePage,
        data: { breadcrumb: 'Editar', title: 'Editar Estilo' },
      },
      {
        path: 'one',
        component: AdminStylePage,
        data: { breadcrumb: 'Crear', title: 'Crear Estilo' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminStylesPage, AdminStylePage],
  providers: [],
})
export class AdminStylesModule {}
