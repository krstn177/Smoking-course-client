import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import IOrderCodeDTO from '../../Models/OrderCodeDTO.model';
import { AuthService } from 'src/app/Services/auth.service';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
    selector: 'app-redeem-code',
    templateUrl: './redeem-code.component.html',
    styleUrls: ['./redeem-code.component.scss'],
    standalone: false
})
export class RedeemCodeComponent {
  @ViewChild('captchaRef') captchaRef!: RecaptchaComponent;

  codeObject = {
    code: ''
  };

  inSubmission = false;
  showAlert = false;
  alertMsg = 'Моля изчакайте! Верифицираме информацията Ви...';
  alertColor = 'blue';

  captcha : string | null = null;

  constructor(private router: Router, private orderService: OrderService, private authService: AuthService) {}

  captchaExecute(captchaResponse: string){
    console.log("WE IN HERE BOIS");
    console.log(this.inSubmission);
    this.captcha = captchaResponse
    console.log(captchaResponse);
    if (!this.captcha) {
      this.inSubmission = true;
      return
    }
    this.redeemCode();
  }

  redeemCode(){
    if (!this.inSubmission) {
      this.inSubmission = true;
      this.showAlert = true;
      this.alertMsg = 'Моля изчакайте! Верифицираме информацията Ви...';
      this.alertColor = 'blue';
  
      this.orderService.redeemCode(this.codeObject as IOrderCodeDTO).subscribe({
        next: (res) => {
  
          this.authService.refreshAccessToken().subscribe({
            next: (response: any) => {
              this.authService.setAuthInfoInLocalStorage(response.accessToken, undefined, undefined);
            },
            error: (err) => {
              throw new Error(err);
            }
          });
  
          this.alertColor = 'green';
          this.alertMsg = 'Успешно активирахте акаунта си! Ще бъдете прехвърлени към страницата с клипове след момент...';
  
          setTimeout(() => {
            this.inSubmission = false;
            this.router.navigateByUrl('videos');
          }, 4000)
        },
        error: (err) => {
          console.log(err);
          this.alertColor = 'red';
          this.alertMsg = 'Опа! Нещо се обърка! Може да опитате пак след 1 минута.';
  
          setTimeout(() => {
            this.showAlert = false;
            this.inSubmission = false;
          }, 60000);
        }
      });
    }
  }

}
