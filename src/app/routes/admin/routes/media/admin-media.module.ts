import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
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
        path: 'sets/:id',
        component: AdminMediaEditPage,
        data: { breadcrumb: 'Editar Set', title: 'Editar Set' },
      },
      {
        path: 'tracks',
        component: AdminMediaListPage,
        data: { breadcrumb: '', title: 'Tracks' },
      },
      {
        path: 'tracks/:id',
        component: AdminMediaEditPage,
        data: { breadcrumb: 'Editar Track', title: 'Editar Track' },
      },
    ]),
  ],
  exports: [],
  declarations: [
    AdminMediaListPage,
    AdminMediaAddPage,
    AdminMediaEditPage,
  ],
  providers: [],
})
export class AdminMediaModule {}
