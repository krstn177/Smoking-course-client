import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'videos',
    loadChildren: async () => (await import('./videos/videos.module')).VideosModule
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
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
