import { SetsPage } from './pages/sets/sets.page';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SetsPage,
        data: { breadcrumb: '', title: 'Tracks - Listado' },
      },
    ]),
  ],
  exports: [],
  declarations: [SetsPage],
  providers: [],
})
export class SetsModule {}
