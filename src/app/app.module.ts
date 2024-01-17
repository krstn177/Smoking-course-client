import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosListComponent } from './videos-list/videos-list.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { VideoPageComponent } from './video-page/video-page.component';
import { AdminModule } from './admin/admin.module';
import { LandingComponent } from './landing/landing.component';
import { OrdersModule } from './orders/orders.module';

@NgModule({
  declarations: [
    AppComponent,
    VideosListComponent,
    VideoCardComponent,
    NavComponent,
    VideoPageComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    SharedModule,
    AdminModule,
    OrdersModule
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
