import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../Services/video.service';
import { LoaderService } from '../../Services/loader.service';
import IVideoSlim from 'src/app/Models/VideoSlim.model';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss']
})
export class VideosListComponent implements OnInit {
  videos? : IVideoSlim[]

  constructor(private videoService: VideoService, private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.videoService.getList().subscribe({
      next: (videos) =>{
        this.videos = videos;
        console.log(videos)
        this.loaderService.hideLoader();
      },
      error: (error) =>{
        console.log(error);
        this.loaderService.hideLoader();
      }
    });
  }
}
