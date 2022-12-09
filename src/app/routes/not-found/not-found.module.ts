import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { NotFoundPage } from './not-found.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotFoundPage,
        data: {
          title: 'Pagina no encontrada',
        },
      },
    ]),
  ],
  exports: [],
  declarations: [NotFoundPage],
  providers: [],
})
export class NotFoundModule {}
