import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import IRegisterUser from 'src/app/Models/RegisterUser.model';
import { AuthService } from 'src/app/Services/auth.service';
import { RegisterValidators } from 'src/app/Validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  inSubmission = false;
  showAlert = false;
  alertMsg = 'Моля изчакайте! Създаваме акаунта Ви...';
  alertColor = 'blue';

  constructor(private authService: AuthService, private router: Router ){}

  registerForm = new FormGroup({
    firstName: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    lastName: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(14),
      Validators.max(120)
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    ]),
    confirm_password: new FormControl('', [
      Validators.required
    ])
  }, [RegisterValidators.match('password', 'confirm_password')])

  register(){
    this.inSubmission = true;
    this.showAlert = true;
    this.authService.register(this.registerForm.value as IRegisterUser).subscribe({
      next: (res) => {
        this.authService.setAuthInfoInLocalStorage(res.accessToken, res.watched, res.favourites);
        this.authService.setAccessToken(res.accessToken);
        
        this.alertMsg = 'Акаунтът Ви е създаден успешно!';
        this.alertColor = 'green';
        this.inSubmission = false;

        setTimeout(() => {
          this.showAlert = false;
          this.router.navigateByUrl('/');
        }, 1000)
      },
      error: (err) => {
        this.alertColor = 'red';

        if (err.error.message == 'Email already registered') {
          this.alertMsg = 'Имейлът, който въведохте вече е използван от друг профил. Пробвайте с друг имейл.';
        } else{
          this.alertMsg = 'Грешка! Пробвайте отново след малко.';
        }

        setTimeout(() => {
          this.showAlert = false;
        }, 5000)
      }
    });
  }
}
