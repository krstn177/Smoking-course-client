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
  alertMsg = 'Моля изчакайте! Верифицираме информацията Ви...';
  alertColor = 'blue';

  constructor(private router: Router, private authService: AuthService) {}

  login(){
    this.inSubmission = true;
    this.showAlert = true;
    this.alertMsg = 'Моля изчакайте! Верифицираме информацията Ви...';
    this.alertColor = 'blue';

    this.authService.login(
      this.credentials
    ).subscribe({
      next: (res) => {
        
        this.authService.setAuthInfoInLocalStorage(res.accessToken, res.watched, res.favourites)

        this.inSubmission = false;
        this.alertMsg = 'Успешно влязохте в профила си.';
        this.alertColor = 'green';

        setTimeout(() => {
          this.showAlert = false;
          this.router.navigateByUrl('/');
        }, 1000);
        
      },
      error: (error) => {
        console.log(error.message);
        this.inSubmission = false;
        this.alertMsg = 'Нещо се обърка! Пробвайте отново.';
        this.alertColor = 'red';

        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    })
  }
}
