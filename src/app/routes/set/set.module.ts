import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { SetPage } from './pages/set/set.page';
import { SetsPage } from './pages/sets/sets.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SetsPage,
        data: {
          title: 'Sets',
          description: 'Listado de sets de musica electronica',
        },
      },
      {
        path: 'filter/:filterKey/:filterValue',
        component: SetsPage,
        data: {
          title: 'Sets',
          description: 'Listado de sets de musica electronica',
        },
      },
      {
        path: 'one/:slug',
        component: SetPage,
        data: { breadcrumb: 'Set', title: 'Set' },
      },
    ]),
  ],
  exports: [],
  declarations: [SetsPage, SetPage],
  providers: [],
})
export class SetModule {}
