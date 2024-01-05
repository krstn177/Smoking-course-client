import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateVideoComponent } from './create-video/create-video.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { RegisterAdminComponent } from './register-admin/register-admin.component';



@NgModule({
  declarations: [
    CreateVideoComponent,
    RegisterAdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
