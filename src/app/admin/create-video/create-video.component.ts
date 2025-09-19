import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import IVideoCreate from 'src/app/Models/VideoCreate.model';
import { VideoService } from 'src/app/Services/video.service';

@Component({
    selector: 'app-create-video',
    templateUrl: './create-video.component.html',
    styleUrls: ['./create-video.component.scss'],
    standalone: false
})
export class CreateVideoComponent {
  inSubmission = false;
  showAlert = false;
  alertMsg = 'Моля изчакай! Клипът се създава...';
  alertColor = 'blue';

  constructor(private videoService: VideoService, private router: Router) {}

  videoForm = new FormGroup({
    title: new FormControl('',{
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]
    }),
    description: new FormControl('',{
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(200)
      ]
    }),
    videoUrl: new FormControl('',{
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),
    screenshotUrl: new FormControl('',{
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),
    duration: new FormControl('',{
      validators: [
        Validators.required,
        Validators.minLength(4)
      ]
    }),
    previous: new FormControl('',{
      validators: [
        Validators.minLength(3)
      ]
    }),
    next: new FormControl('',{
      validators: [
        Validators.minLength(3)
      ]
    }),
  })

  sendVideo(){
    this.inSubmission = true;
    this.showAlert = true;

    console.log(this.videoForm);
    this.videoService.createVideo(this.videoForm.value as IVideoCreate).subscribe({
      next: (res) => {
        console.log(res);
        const { _id } = res;
        this.alertColor = "green";
        this.alertMsg = "Получи се!";
        this.inSubmission = false;

        setTimeout(() => {
          this.router.navigateByUrl(`videos/${_id}`);
        }, 2000)
      },
      error: (err) => {
        console.error(err);
        this.alertColor = "red";
        this.alertMsg = "Нещо не се получи!";
        this.inSubmission = false;
      }
    });
  }
}
