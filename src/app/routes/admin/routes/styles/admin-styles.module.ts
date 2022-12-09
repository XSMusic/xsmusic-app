import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminStyleListViewComponent } from './components/admin-style-list-view/admin-style-list-view.component';
import { AdminStyleOneComponent } from './components/admin-style-one/admin-style-one.component';
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
        path: ':id',
        component: AdminStylePage,
        data: { breadcrumb: 'Editar', title: 'Admin - Editar Estilo' },
      },
    ]),
  ],
  exports: [],
  declarations: [
    AdminStyleOneComponent,
    AdminStylesPage,
    AdminStylePage,
    AdminStyleOneComponent,
    AdminStyleListViewComponent,
  ],
  providers: [],
})
export class AdminStylesModule {}
