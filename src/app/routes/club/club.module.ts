import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ClubBlockInfoComponent } from './components/block-info/club-block-info.component';
import { ClubPage } from './pages/club/club.page';
import { ClubsPage } from './pages/clubs/clubs.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClubsPage,
        data: { breadcrumb: '', title: 'Clubs' },
      },
      {
        path: 'filter/:filterKey/:filterValue',
        component: ClubsPage,
        data: { title: 'Clubs' },
      },
      {
        path: 'one/:slug',
        component: ClubPage,
        data: { title: 'Club' },
      },
    ]),
  ],
  exports: [],
  declarations: [ClubsPage, ClubPage, ClubBlockInfoComponent],
  providers: [],
})
export class ClubsModule {}
