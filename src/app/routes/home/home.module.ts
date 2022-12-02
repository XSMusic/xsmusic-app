import { NgModule } from '@angular/core';
import { HomePage } from './pages/home.page';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { LastMediaItemComponent } from './components/last-media-block/last-media-item/last-media-item.component';
import { LastMediaItemsComponent } from './components/last-media-block/last-media-items/last-media-items.component';
import { LastMediaComponent } from './components/last-media-block/last-media/last-media.component';

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
  declarations: [
    LastMediaItemComponent,
    LastMediaComponent,
    HomePage,
    LastMediaComponent,
    LastMediaItemsComponent,
    LastMediaItemComponent,
  ],
  providers: [],
})
export class HomeModule {}
