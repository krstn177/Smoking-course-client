import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import IUserOrderInfo from '../../Models/UserOrderInfo.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IOrderDTO from '../../Models/OrderDTO.model';
import { LoaderService } from '../../Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  reviewStage: boolean = false;
  successStage: boolean = false;
  userInfo : IUserOrderInfo | null = null;
  orderInfo: IOrderDTO | null = null;

  constructor(private router: Router, private orderService: OrderService, private authService: AuthService, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.orderService.getUserInfo().subscribe({
      next: (user) => {
        console.log(user);
        this.userInfo = user as IUserOrderInfo;
        this.loaderService.hideLoader();
      },
      error: (err) => {
        console.log(err);
        this.loaderService.hideLoader();
      }
    })
  }

  orderForm = new FormGroup({
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(400)
    ])
  });

  toggleStages(){
    this.reviewStage = !this.reviewStage;
  }

  onNext(){
    this.orderInfo = this.orderForm.value as IOrderDTO;
    this.toggleStages();
  }

  onBack(){
    this.toggleStages();
  }

  onSubmit(){
    this.loaderService.showLoader();
    this.orderService.makeOrder(this.orderInfo as IOrderDTO).subscribe({
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
        
        this.successStage = true;
        this.loaderService.hideLoader();
        setTimeout(() => {
          this.router.navigateByUrl('orders/redeem-code');
        }, 5000)
      },
      error: (err) => {
        this.loaderService.hideLoader();
        console.log(err);
      }
    })
  }
}
