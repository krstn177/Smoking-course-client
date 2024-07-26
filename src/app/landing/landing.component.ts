import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit{
  private secondVideo: HTMLVideoElement | null = null;
  public videoPlayed = false;
  public isLoggedIn: boolean = false;

  constructor(private elementRef: ElementRef) {
    this.isLoggedIn = !!localStorage.getItem('accessToken');
  }

  ngAfterViewInit(): void {
    this.secondVideo = this.elementRef.nativeElement.querySelectorAll('video')[1];
    this.secondVideo?.pause();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkAndPlayVideo();
  }

  private checkAndPlayVideo(): void {
    if (this.secondVideo && !this.videoPlayed) {
      const rect = this.secondVideo.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      this.secondVideo.onplay = () => {
        this.videoPlayed = true;
      };
      if (rect.top >= 0 && rect.bottom <= windowHeight) {
        this.secondVideo.play();
      }
    }
  }
}
