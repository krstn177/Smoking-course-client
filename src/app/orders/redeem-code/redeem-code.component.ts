import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import IOrderCodeDTO from '../../Models/OrderCodeDTO.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-redeem-code',
  templateUrl: './redeem-code.component.html',
  styleUrls: ['./redeem-code.component.scss']
})
export class RedeemCodeComponent {
  codeObject = {
    code: ''
  };

  inSubmission = false;
  showAlert = false;
  alertMsg = 'Please wait! You are being verified...';
  alertColor = 'blue';

  constructor(private router: Router, private orderService: OrderService, private authService: AuthService) {}

  redeemCode(){
    this.inSubmission = true;
    this.showAlert = true;
    this.alertMsg = 'Please wait! You are being verified...';
    this.alertColor = 'blue';

    this.orderService.redeemCode(this.codeObject as IOrderCodeDTO).subscribe({
      next: (res) => {
        console.log(res);

        this.authService.refreshAccessToken().subscribe({
          next: (response: any) => {
            this.authService.setAuthInfoInLocalStorage(response.accessToken, undefined, undefined);
          },
          error: (err) => {
            throw new Error(err);
          }
        });

        this.inSubmission = false;
        this.alertColor = 'green';
        this.alertMsg = 'Success! You successfully activated your account! You will be redirected to the dashboard in a sec...';

        setTimeout(() => {
          this.router.navigateByUrl('videos');
        }, 4000)
      },
      error: (err) => {
        console.log(err);
        this.inSubmission = false;
        this.alertColor = 'red';
        this.alertMsg = 'Oops! Something went wrong!';
      }
    });
  }

}
