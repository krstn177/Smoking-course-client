import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order/order.component';
import { RedeemCodeComponent } from './redeem-code/redeem-code.component';
import { OrdersRoutingModule } from './orders-routing.module';
// import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';



@NgModule({
  declarations: [
    OrderComponent,
    RedeemCodeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OrdersRoutingModule,
    // RecaptchaModule,
    // RecaptchaFormsModule
  ]
})
export class OrdersModule { }
