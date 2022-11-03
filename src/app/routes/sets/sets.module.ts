import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { SetsPage } from './page/sets/sets.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SetsPage,
        data: { breadcrumb: '', title: 'Sets - Listado' },
      },
    ]),
  ],
  exports: [],
  declarations: [SetsPage],
  providers: [],
})
export class SetsModule {}
