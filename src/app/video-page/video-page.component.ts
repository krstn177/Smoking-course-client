import { Component, ViewChild, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { VideoService } from '../Services/video.service';
import IVideo from '../Models/Video.model';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoPageComponent implements OnInit {
  id: string = "TO1sptlWazLto6picEJD";
  video?: IVideo;
  @ViewChild('videoPlayer', {static: true}) target?: ElementRef;
  player? : Player;

  constructor(public route: ActivatedRoute, private videoService: VideoService){}

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement);

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    
    this.videoService.getVideoInfo(this.id).subscribe({
      next: (data) => {
        this.video = data;
        const fileName = data.fileName.replace('videos/', '').trim();

        this.player?.poster(this.video?.screenshotFileUrl);

        this.videoService.downloadVideo(fileName).subscribe({
          next: (data: Blob) =>{
            const blobUrl = window.URL.createObjectURL(data);
            
            this.player?.src({
              src: blobUrl,
              type: 'video/mp4',
            });
          }, 
          error: (error) => {
            console.error(error);
          }
        });
        
      },
      error: (error) =>{
        console.error(error);
      }
    });

    
  }
}
