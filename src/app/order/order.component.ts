import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  reviewStage: boolean = false;

  toggleStages(){
    this.reviewStage = !this.reviewStage;
  }
}
