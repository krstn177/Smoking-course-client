import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosListComponent } from './videos-list/videos-list.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { VideosRoutingModule } from './videos-routing.module';
import { VideoPageComponent } from './video-page/video-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VideosListComponent,
    VideoCardComponent,
    VideoPageComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    FormsModule
  ]
})
export class VideosModule { }
