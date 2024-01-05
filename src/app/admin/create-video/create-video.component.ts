import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import IVideoDTO from 'src/app/Models/VideoDTO.model';
import { VideoService } from 'src/app/Services/video.service';

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.scss']
})
export class CreateVideoComponent {
  inSubmission = false;
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created...';
  alertColor = 'blue';

  constructor(private videoService: VideoService, private router: Router) {}

  videoForm = new FormGroup({
    Title: new FormControl('',{
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),
    Description: new FormControl('',{
      validators: [
        Validators.required,
        Validators.minLength(6)
      ]
    }),
    Video: new FormControl<File | null>(null, {
      validators:[
        Validators.required
      ]
    }),
    VideoScreenshot: new FormControl<File | null>(null, {
      validators:[
        Validators.required
      ]
    }),
  })

  onImageUpload($event: Event) {
    const imageFile = ($event.target as HTMLInputElement).files?.item(0) ?? null;
    if (!imageFile || (imageFile.type !== 'image/png' && imageFile.type !== 'image/jpeg')) {
      return;
    }
    console.log(this.videoForm);
    this.videoForm.patchValue({VideoScreenshot: imageFile});
  }

  onVideoUpload($event: Event) {
    const videoFile = ($event.target as HTMLInputElement).files?.item(0) ?? null;
    if (!videoFile || videoFile.type !== 'video/mp4') {
      return;
    }
    console.log(this.videoForm);
    this.videoForm.patchValue({Video: videoFile});
  }

  sendVideo(){
    this.inSubmission = true;
    this.showAlert = true;

    console.log(this.videoForm);
    this.videoService.createVideo(this.videoForm.value as IVideoDTO).subscribe({
      next: (res) => {
        console.log(res);
        this.alertColor = "green";
        this.alertMsg = "Is all good";
        this.inSubmission = false;

        setTimeout(() => {
          this.router.navigateByUrl(`video/${res}`);
        }, 2000)
      },
      error: (err) => {
        console.error(err);
        this.alertColor = "red";
        this.alertMsg = "Is all not good";
        this.inSubmission = false;
      }
    });
  }
}
