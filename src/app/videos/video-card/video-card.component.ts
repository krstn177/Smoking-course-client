import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IVideoSlim from 'src/app/Models/VideoSlim.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})

export class VideoCardComponent implements OnInit {
  @Input() videoInfo?: IVideoSlim;
  isFavourite: boolean = false;
  loadingFavourite: boolean = false;
  isWatched: boolean = false;
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.videoInfo) {
      this.authService.getUserWatched()?.includes(this.videoInfo._id) ? this.isWatched = true : this.isWatched = false;
      this.authService.getUserFavourites()?.includes(this.videoInfo._id) ? this.isFavourite = true : this.isFavourite = false;
    }
  }

  toggleFavourite(event: MouseEvent) {
    event.stopPropagation();
    this.loadingFavourite = true;
    this.authService.toggleUserFavouriteRequest(this.videoInfo?._id!).subscribe({
      next: (res) => {
        this.isFavourite = !this.isFavourite;
        this.authService.toggleFavouriteVideo(this.videoInfo?._id!);
        this.loadingFavourite = false;
      },
      error: (err) => {
        console.log(err);
        this.loadingFavourite = false;
      }
    });
  }
}
