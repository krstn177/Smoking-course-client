import { Component, OnInit, } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import IVideo from 'src/app/Models/Video.model';
import IVideoSlim from 'src/app/Models/VideoSlim.model';
import { AuthService } from 'src/app/Services/auth.service';
import { LoaderService } from 'src/app/Services/loader.service';
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

  isFavourite: boolean = false;
  loadingFavourite: boolean = false;

  videoUrlSanitized: SafeResourceUrl | null = null;
  constructor(public videoService: VideoService, public route: ActivatedRoute, public authService: AuthService, public loaderService: LoaderService, public sanitizer: DomSanitizer){}

  loadVideo(videoId: string): void {
    this.videoService.getVideoInfo(videoId).subscribe({
      next: (videoData) => {
        this.authService.addWatchedVideo(videoData._id);

        this.videoDataObj = {
          _id: videoData._id,
          title: videoData.title,
          description: videoData.description,
          videoUrl: videoData.videoUrl,
          screenshotUrl: videoData.screenshotUrl,
          duration: videoData.duration
        };
        
        console.log(videoData.videoUrl);
        const fullVideoUrl = `https://iframe.mediadelivery.net/embed/268369/${videoData.videoUrl}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;

        this.videoUrlSanitized = this.sanitizer.bypassSecurityTrustResourceUrl(fullVideoUrl);

        this.authService.getUserFavourites()?.includes(this.videoDataObj._id) ? this.isFavourite = true : this.isFavourite = false;
        
        videoData.hasOwnProperty('previous') ? this.previousVideo = videoData.previous : this.previousVideo = undefined;
        videoData.hasOwnProperty('next') ? this.nextVideo = videoData.next : this.nextVideo = undefined;

        this.loaderService.hideLoader();
      },
      error: (err: any) => {
        console.log(err);
        this.loaderService.hideLoader();
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const videoId = params.get('id');
      if (videoId) {
        this.loaderService.showLoader();
        this.loadVideo(videoId);
      }
    });
  }

  toggleFavourite(event: MouseEvent) {
    event.stopPropagation();
    this.loadingFavourite = true;
    this.authService.toggleUserFavouriteRequest(this.videoDataObj?._id!).subscribe({
      next: (res) => {
        this.isFavourite = !this.isFavourite;
        this.authService.toggleFavouriteVideo(this.videoDataObj?._id!);
        this.loadingFavourite = false;
      },
      error: (err) => {
        console.log(err);
        this.loadingFavourite = false;
      }
    });
  }
}
