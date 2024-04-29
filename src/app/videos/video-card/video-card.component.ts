import { Component, Input, OnInit } from '@angular/core';
import IVideoSlim from 'src/app/Models/VideoSlim.model';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})

export class VideoCardComponent implements OnInit {
  @Input() videoInfo?: IVideoSlim
  
  ngOnInit(): void {
  }
}
