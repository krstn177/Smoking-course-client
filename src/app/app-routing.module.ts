import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosListComponent } from './videos-list/videos-list.component';
import { VideoPageComponent } from './video-page/video-page.component';
import { LandingComponent } from './landing/landing.component';
import { activatedGuard } from './Guards/activated.guard';
import { OrderComponent } from './orders/order/order.component';
import { RedeemCodeComponent } from './orders/redeem-code/redeem-code.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'videos',
    component: VideosListComponent,
    canActivate: [activatedGuard]
  },
  {
    path: 'video/:id',
    component: VideoPageComponent,
    canActivate: [activatedGuard]
  },
  {
    path: 'orders',
    loadChildren: async () => (await import('./orders/orders.module')).OrdersModule
  },
  {
    path: 'user',
    loadChildren: async () => (await import('./user/user.module')).UserModule
  },
  {
    path: 'admin',
    loadChildren: async () => (await import('./admin/admin.module')).AdminModule
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
