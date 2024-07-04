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
  alertMsg = 'Моля изчакайте! Верифицираме информацията Ви...';
  alertColor = 'blue';

  constructor(private router: Router, private orderService: OrderService, private authService: AuthService) {}

  redeemCode(){
    this.inSubmission = true;
    this.showAlert = true;
    this.alertMsg = 'Моля изчакайте! Верифицираме информацията Ви...';
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
        this.alertMsg = 'Успешно активирахте акаунта си! Ще бъдете прехвърлени към страницата с клипове след момент...';

        setTimeout(() => {
          this.router.navigateByUrl('videos');
        }, 4000)
      },
      error: (err) => {
        console.log(err);
        this.inSubmission = false;
        this.alertColor = 'red';
        this.alertMsg = 'Опа! Нещо се обърка!';
      }
    });
  }

}
