import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { RecaptchaComponent } from 'ng-recaptcha-2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent {
  @ViewChild('captchaRef') captchaRef!: RecaptchaComponent;

  credentials = {
    email: '',
    password: ''
  };

  inSubmission = false;
  showAlert = false;
  alertMsg = 'Моля изчакайте! Верифицираме информацията Ви...';
  alertColor = 'blue';

  disableAction = false;
  captcha : string | null = null;
  constructor(private router: Router, private authService: AuthService) {
  }

  captchaExecute(captchaResponse: string){
    console.log("WE IN HERE BOIS");
    console.log(this.inSubmission);
    this.captcha = captchaResponse
    console.log(captchaResponse);
    if (!this.captcha) {
      this.inSubmission = true;
      return
    }
    this.login();
  }

  login(){
    console.log("WE IN HERE BOIS");
    if (!this.inSubmission) {
      
      this.inSubmission = true;
      this.showAlert = true;
      this.alertMsg = 'Моля изчакайте! Верифицираме информацията Ви...';
      this.alertColor = 'blue';

      this.authService.login(
        this.credentials
      ).subscribe({
        next: (res) => {
          
          this.authService.setAuthInfoInLocalStorage(res.accessToken, res.watched, res.favourites)
  
          this.alertMsg = 'Успешно влязохте в профила си.';
          this.alertColor = 'green';
          
          setTimeout(() => {
            this.showAlert = false;
            this.inSubmission = false;
            this.router.navigateByUrl('/');
          }, 1000);
          
        },
        error: (error) => {
          console.log(error.message);
          this.alertMsg = 'Нещо се обърка! Пробвайте отново след секунда.';
          this.alertColor = 'red';
          
          setTimeout(() => {
            this.showAlert = false;
            this.inSubmission = false;
            this.captchaRef.reset();
          }, 3000);
        }
      })
    }
  }
}
