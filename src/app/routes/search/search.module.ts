import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { SearchPage } from './pages/search.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: ':text/:type',
        component: SearchPage,
        data: { breadcrumb: '', title: 'Artistas - Listado' },
      },
    ]),
  ],
  exports: [],
  declarations: [SearchPage],
  providers: [],
})
export class SearchModule {}
