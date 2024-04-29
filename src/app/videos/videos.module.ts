import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosListComponent } from './videos-list/videos-list.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { VideosRoutingModule } from './videos-routing.module';
import { VideoPageComponent } from './video-page/video-page.component';



@NgModule({
  declarations: [
    VideosListComponent,
    VideoCardComponent,
    VideoPageComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule
  ]
})
export class VideosModule { }
