import { Component, Input, OnInit } from '@angular/core';
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
  isWatched: boolean = false;
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.videoInfo) {
      this.authService.getUserWatched()?.includes(this.videoInfo._id) ? this.isWatched = true : this.isWatched = false;
      this.authService.getUserFavourites()?.includes(this.videoInfo._id) ? this.isFavourite = true : this.isFavourite = false;
    }
  }

  toggleFavourite() {
    try{
      this.authService.toggleFavouriteVideo(this.videoInfo?._id!);
      this.isFavourite = !this.isFavourite;
    } catch(err) {
      console.log(err);
    }
  }
}
