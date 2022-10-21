import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ClubPage } from './pages/clubs/clubs.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClubPage,
        data: { breadcrumb: '', title: 'Clubs - Listado' },
      },
    ]),
  ],
  exports: [],
  declarations: [ClubPage],
  providers: [],
})
export class ClubsModule {}
