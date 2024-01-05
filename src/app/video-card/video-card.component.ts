import { Component, Input, OnInit } from '@angular/core';
import IVideo from '../Models/Video.model';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})

export class VideoCardComponent implements OnInit {
  @Input() videoInfo?: IVideo
  
  ngOnInit(): void {
    console.log(this.videoInfo?.id);
    console.log(this.videoInfo?.screenshotFileName);
    console.log(this.videoInfo?.screenshotFileUrl);
  }
}
