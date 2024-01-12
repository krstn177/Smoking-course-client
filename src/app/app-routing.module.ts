import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosListComponent } from './videos-list/videos-list.component';
import { VideoPageComponent } from './video-page/video-page.component';
import { LandingComponent } from './landing/landing.component';
import { activatedGuard } from './Guards/activated.guard';
import { OrderComponent } from './order/order.component';


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
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'video/:id',
    component: VideoPageComponent,
    canActivate: [activatedGuard]
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
