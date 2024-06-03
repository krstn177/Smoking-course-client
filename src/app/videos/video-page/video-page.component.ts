import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import IVideo from 'src/app/Models/Video.model';
import IVideoSlim from 'src/app/Models/VideoSlim.model';
import { AuthService } from 'src/app/Services/auth.service';
import { VideoService } from 'src/app/Services/video.service';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrl: './video-page.component.scss'
})
export class VideoPageComponent implements OnInit {
  videoDataObj: IVideo | null = null;
  previousVideo: IVideoSlim | undefined = undefined;
  nextVideo: IVideoSlim | undefined = undefined;

  constructor(public videoService: VideoService, public route: ActivatedRoute, public authService: AuthService){
  }

  loadVideo(videoId: string): void {
    this.videoService.getVideoInfo(videoId).subscribe({
      next: (videoData) => {
        this.authService.addWatchedVideo(videoData._id);

        this.videoDataObj = {
          _id: videoData._id,
          title: videoData.title,
          description: videoData.description,
          videoUrl: videoData.videoUrl,
          screenshotUrl: videoData.screenshotUrl
        };

        videoData.hasOwnProperty('previous') ? this.previousVideo = videoData.previous : this.previousVideo = undefined;
        videoData.hasOwnProperty('next') ? this.nextVideo = videoData.next : this.nextVideo = undefined;
      },
      error: (err: any) => {
        console.log(err)
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const videoId = params.get('id');
      if (videoId) {
        this.loadVideo(videoId);
      }
    });
  }
}
