import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { OrderComponent } from "./order/order.component";
import { RedeemCodeComponent } from "./redeem-code/redeem-code.component";
import { orderedGuard } from "../Guards/ordered.guard";
import { redeemableGuard } from "../Guards/redeemable.guard";
import { guestGuard } from "../Guards/guest.guard";
import { userGuard } from "../Guards/user.guard";

const routes: Routes = [
    {
        path: 'make-order',
        component: OrderComponent,
        canActivate: [guestGuard, orderedGuard, userGuard]
    },
    {
        path: 'redeem-code',
        component: RedeemCodeComponent,
        canActivate: [guestGuard, redeemableGuard, userGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {}