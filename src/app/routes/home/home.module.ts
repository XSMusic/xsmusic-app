import { NgModule } from '@angular/core';
import { HomePage } from './pages/home.page';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
  ],
  exports: [],
  declarations: [HomePage],
  providers: [],
})
export class HomeModule {}
