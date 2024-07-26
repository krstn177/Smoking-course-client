import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    UserRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ]
})
export class UserModule { }
