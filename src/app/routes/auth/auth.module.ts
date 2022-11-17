import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { ForgottenPasswordPage } from './pages/forgotten-password/forgotten-password.page';
import { ResetChangePasswordPage } from './pages/reset-change-password/reset-change-password.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginPage,
        data: { breadcrumb: 'Login', title: 'Login' },
      },
      {
        path: 'register',
        component: RegisterPage,
        data: { breadcrumb: 'Registro', title: 'Registro' },
      },
      {
        path: 'forgottenPassword',
        component: ForgottenPasswordPage,
        data: {
          breadcrumb: 'Contraseña Olvidada',
          title: 'Contraseña olvidada',
        },
      },
      {
        path: 'resetPassword/:userId/:token',
        component: ResetChangePasswordPage,
        data: {
          breadcrumb: 'Contraseña Olvidada',
          title: 'Contraseña olvidada',
        },
      },
    ]),
  ],
  exports: [],
  declarations: [
    LoginPage,
    RegisterPage,
    ForgottenPasswordPage,
    ResetChangePasswordPage,
  ],
  providers: [],
})
export class ArtistsModule {}
