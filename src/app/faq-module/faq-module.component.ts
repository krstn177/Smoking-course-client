import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-faq-module',
  templateUrl: './faq-module.component.html',
  styleUrl: './faq-module.component.scss'
})
export class FaqModuleComponent implements AfterViewInit, OnDestroy{
  @Input() titleQuestionSpan1: string = '';
  @Input() titleQuestionSpan2: string = '';
  @Input() description: string = '';
  @Input() videoName: string = '';
  @Input() reversed: boolean = false;

  private video: HTMLVideoElement | null = null;
  public videoPlayed: boolean = false;
  private observer: IntersectionObserver | null = null;

  public isLoggedIn: boolean = false;

  constructor(private elementRef: ElementRef) {
    this.isLoggedIn = !!localStorage.getItem('accessToken');
  }

  ngAfterViewInit(): void {
    this.video = this.elementRef.nativeElement.querySelector('video');
    this.video?.pause();


    if (this.video) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          
          if (entry.isIntersecting && !this.videoPlayed) {
            this.video?.play();
            this.videoPlayed = true;
          }
        });
      }, { threshold: 0.5 });

      this.observer.observe(this.video);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

}
