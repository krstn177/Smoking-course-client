import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  inSubmission = false;
  showAlert = false;
  alertMsg = 'Please wait! You are being verified...';
  alertColor = 'blue';

  constructor(private router: Router, private authService: AuthService) {}

  login(){
    this.inSubmission = true;
    this.showAlert = true;
    this.alertMsg = 'Please wait! You are being verified...';
    this.alertColor = 'blue';

    this.authService.login(
      this.credentials
    ).subscribe({
      next: (res) => {
        
        this.authService.setAuthInfoInLocalStorage(res.accessToken, res.watched, res.favourites)

        this.inSubmission = false;
        this.alertMsg = 'Success! You are now logged in.';
        this.alertColor = 'green';

        setTimeout(() => {
          this.showAlert = false;
          this.router.navigateByUrl('/');
        }, 1000);
        
      },
      error: (error) => {
        console.log(error.message);
        this.inSubmission = false;
        this.alertMsg = 'Error! Something went wrong please try again later.';
        this.alertColor = 'red';

        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    })
  }
}
