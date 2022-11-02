import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { SetsPage } from './pages/sets/sets.page';
import { SetPage } from './pages/set/set.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SetsPage,
        data: { breadcrumb: '', title: 'Sets - Listado' },
      },
      {
        path: ':id',
        component: SetPage,
        data: { breadcrumb: 'Set', title: 'Set' },
      },
    ]),
  ],
  exports: [],
  declarations: [SetsPage, SetPage],
  providers: [],
})
export class SetsModule {}
