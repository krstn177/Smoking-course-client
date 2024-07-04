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

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.video = this.elementRef.nativeElement.querySelector('video');
    this.video?.pause();

    console.log(this.video);

    if (this.video) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          console.log('yea');
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
