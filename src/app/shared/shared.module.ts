import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { InputComponent } from './input/input.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    AlertComponent,
    InputComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AlertComponent,
    InputComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
