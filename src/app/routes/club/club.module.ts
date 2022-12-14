import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ClubPage } from './pages/club/club.page';
import { ClubsPage } from './pages/clubs/clubs.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClubsPage,
        data: {
          description: 'Listado de clubs de musica electronica',
          title: 'Clubs',
        },
      },
      {
        path: ':slug',
        component: ClubPage,
      },
    ]),
  ],
  exports: [],
  declarations: [ClubsPage, ClubPage],
  providers: [],
})
export class ClubsModule {}
