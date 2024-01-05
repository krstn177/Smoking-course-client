import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosListComponent } from './videos-list/videos-list.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { VideoPageComponent } from './video-page/video-page.component';


const routes: Routes = [
  {
    path: '',
    component: VideosListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'video/:id',
    component: VideoPageComponent
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
