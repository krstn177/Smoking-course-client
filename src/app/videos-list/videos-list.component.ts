import { Component, OnInit } from '@angular/core';
import { VideoService } from '../Services/video.service';
import IVideo from '../Models/Video.model';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss']
})
export class VideosListComponent implements OnInit {
  videos? : IVideo []

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.videoService.getList().subscribe({
      next: (videos) =>{
        this.videos = videos;
        console.log(videos);
      }
    });
  }
}
