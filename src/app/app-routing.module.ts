import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutesRoutingModule } from './core/config/routes-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [SharedModule, RoutesRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
