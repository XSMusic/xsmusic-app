import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { routesConfig } from '../../core/config/routes.config';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: routesConfig.login, pathMatch: 'full' },
      {
        path: routesConfig.login,
        component: LoginPage,
        data: { breadcrumb: 'Login', title: 'Login' },
      },
      {
        path: routesConfig.register,
        component: RegisterPage,
        data: { breadcrumb: 'Registro', title: 'Registro' },
      },
    ]),
  ],
  exports: [],
  declarations: [LoginPage, RegisterPage],
  providers: [],
})
export class ArtistsModule {}
