import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../Services/video.service';
import { LoaderService } from '../../Services/loader.service';
import IVideoSlim from 'src/app/Models/VideoSlim.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss']
})
export class VideosListComponent implements OnInit {
  initialVideos? : IVideoSlim[];
  videos?: IVideoSlim[];
  searchTerm: string = '';
  showFavourites: boolean = false;

  constructor(private videoService: VideoService, private loaderService: LoaderService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.videoService.getList().subscribe({
      next: (videos) =>{
        this.initialVideos = videos;
        this.videos = videos;
        this.loaderService.hideLoader();
      },
      error: (error) =>{
        this.loaderService.hideLoader();
      }
    });
  }

  toggleFavourites(): void{
    this.showFavourites = !this.showFavourites;
    if (this.showFavourites) {
      const favourites = this.authService.getUserFavourites();
      this.videos = this.videos?.filter(video => favourites?.includes(video._id));
    } else {
      this.videos = this.initialVideos;
    }
  }

  search(): void{
    this.videos = this.initialVideos?.filter(video => video.title.toLowerCase().includes(this.searchTerm) || video.description.toLowerCase().includes(this.searchTerm));
  }
}
