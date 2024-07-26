import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { AdminModule } from './admin/admin.module';
import { LandingComponent } from './landing/landing.component';
import { OrdersModule } from './orders/orders.module';
import { FooterComponent } from './footer/footer.component';
import { FaqModuleComponent } from './faq-module/faq-module.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    FaqModuleComponent,
    NotFoundComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    SharedModule,
    AdminModule,
    OrdersModule,
    FooterComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
