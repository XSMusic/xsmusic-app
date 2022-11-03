import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';

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
    ]),
  ],
  exports: [],
  declarations: [LoginPage, RegisterPage],
  providers: [],
})
export class ArtistsModule {}
