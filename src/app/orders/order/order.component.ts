import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import IUserInfo from '../../Models/UserInfo.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IOrderDTO from '../../Models/OrderDTO.model';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  reviewStage: boolean = false;
  successStage: boolean = false;
  userInfo : IUserInfo | null = null;
  orderInfo: IOrderDTO | null = null;

  constructor(private router: Router, private orderService: OrderService, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.orderService.getUserInfo().subscribe({
      next: (user) => {
        console.log(user);
        this.userInfo = user as IUserInfo;
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
      Validators.minLength(2),
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

  onSubmit(){
    this.loaderService.showLoader();
    this.orderService.makeOrder(this.orderInfo as IOrderDTO).subscribe({
      next: (res) => {
        console.log(res);
        this.successStage = true;
        this.loaderService.hideLoader();
        this.orderService.setHasOrdered();
        setTimeout(() => {
          this.router.navigateByUrl('orders/redeem-code');
        }, 3000)
      },
      error: (err) => {
        this.loaderService.hideLoader();
        console.log(err);
      }
    })
  }
}
