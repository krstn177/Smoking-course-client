import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosListComponent } from './videos-list/videos-list.component';
import { VideoPageComponent } from './video-page/video-page.component';


const routes: Routes = [
  {
    path: '',
    component: VideosListComponent
  },
  {
    path: 'video/:id',
    component: VideoPageComponent
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
