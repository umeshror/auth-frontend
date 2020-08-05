import {NgModule} from '@angular/core';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AuthRoutingModule} from './auth-routing.module';
import {GoogleLoginComponent} from './google-login/google-login.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    GoogleLoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ]
})
export class AuthModule {

}
