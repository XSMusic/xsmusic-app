import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminMediaAddSearchComponent } from './components/add-search/admin-media-add-search.component';
import { AdminMediaOneComponent } from './components/one/admin-media-one.component';
import { AdminMediaAddPage } from './pages/add/admin-media-add.page';
import { AdminMediaEditPage } from './pages/edit/admin-media-edit.page';
import { AdminMediaListPage } from './pages/list/admin-media-list.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '*', redirectTo: 'sets', pathMatch: 'full' },
      { path: '', redirectTo: 'sets', pathMatch: 'full' },
      {
        path: 'sets',
        component: AdminMediaListPage,
        data: { breadcrumb: '', title: 'Sets' },
      },
      {
        path: 'sets/add',
        component: AdminMediaAddPage,
        data: { breadcrumb: 'Nuevo Set', title: 'Nuevo Set' },
      },
      {
        path: 'sets/edit/:id',
        component: AdminMediaEditPage,
        data: { breadcrumb: 'Editar Set', title: 'Editar Set' },
      },
      {
        path: 'tracks',
        component: AdminMediaListPage,
        data: { breadcrumb: '', title: 'Tracks' },
      },
      {
        path: 'tracks/add',
        component: AdminMediaAddPage,
        data: { breadcrumb: 'Nuevo Track', title: 'Nuevo Track' },
      },
      {
        path: 'tracks/edit/:id',
        component: AdminMediaEditPage,
        data: { breadcrumb: 'Editar Track', title: 'Editar Track' },
      },
    ]),
  ],
  exports: [],
  declarations: [
    AdminMediaAddSearchComponent,
    AdminMediaAddSearchComponent,
    AdminMediaListPage,
    AdminMediaAddSearchComponent,
    AdminMediaAddPage,
    AdminMediaEditPage,
    AdminMediaOneComponent,
  ],
  providers: [],
})
export class AdminMediaModule {}
