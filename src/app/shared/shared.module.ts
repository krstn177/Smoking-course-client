import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { InputComponent } from './input/input.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AlertComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AlertComponent,
    InputComponent
  ]
})
export class SharedModule { }
