import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { SetPage } from './page/set/set.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: SetPage,
        data: { breadcrumb: 'Set', title: 'Set' },
      },
    ]),
  ],
  exports: [],
  declarations: [SetPage],
  providers: [],
})
export class SetModule {}
