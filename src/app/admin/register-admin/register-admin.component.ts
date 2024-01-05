import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import IUser from 'src/app/Models/User.model';
import { AuthService } from 'src/app/Services/auth.service';
import { RegisterValidators } from 'src/app/Validators/register-validators';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent {
  inSubmission = false;
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created...';
  alertColor = 'blue';

  constructor(private authService: AuthService, private router: Router ){}

  registerAdminForm = new FormGroup({
    name: new FormControl('',[
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
      Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    ]),
    confirm_password: new FormControl('', [
      Validators.required
    ])
  }, [RegisterValidators.match('password', 'confirm_password')])

  async registerAdmin(){
    this.inSubmission = true;
    this.showAlert = true;
    this.authService.registerAdmin(this.registerAdminForm.value as IUser).subscribe({
      next: (token) => {
        this.authService.setToken(token);
        this.alertMsg = 'Success! Your account has been created.';
        this.alertColor = 'green';
        this.inSubmission = false;

        setTimeout(() => {
          this.showAlert = false;
          this.router.navigateByUrl('/');
        }, 1000)
      },
      error: (err) => {
        console.error(err);
        console.error(err.error);

        if (err.Reason == "EmailExists") {
          this.alertMsg = "Email already exists."
        }
        else{
          this.alertMsg = 'An unexpected error occured. Please try again later';
        }

        this.alertColor = 'red';
        return;
      }
    });
  }
}
