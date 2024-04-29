import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import IOrderCodeDTO from '../../Models/OrderCodeDTO.model';

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

  constructor(private router: Router, private orderService: OrderService) {}

  redeemCode(){
    this.inSubmission = true;
    this.showAlert = true;
    this.alertMsg = 'Please wait! You are being verified...';
    this.alertColor = 'blue';

    this.orderService.redeemCode(this.codeObject as IOrderCodeDTO).subscribe({
      next: (res) => {
        console.log(res);
        this.orderService.setActivatedRole();
        this.inSubmission = false;
        this.alertColor = 'green';
        this.alertMsg = 'Success! You successfully activated your account!';

        this.router.navigateByUrl('videos');
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
