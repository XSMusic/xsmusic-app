import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminLikePage } from './pages/like/admin-like.page';
import { AdminLikesPage } from './pages/likes/admin-likes.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLikesPage,
        data: { breadcrumb: '', title: 'Admin - Likes' },
      },
      {
        path: ':id',
        component: AdminLikePage,
        data: { breadcrumb: 'Editar Like', title: 'Admin - Editar Likes' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminLikesPage, AdminLikePage],
  providers: [],
})
export class AdminLikesModule {}
