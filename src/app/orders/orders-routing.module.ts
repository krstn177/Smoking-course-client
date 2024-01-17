import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { OrderComponent } from "./order/order.component";
import { RedeemCodeComponent } from "./redeem-code/redeem-code.component";
import { orderedGuard } from "../Guards/ordered.guard";
import { redeemableGuard } from "../Guards/redeemable.guard";

const routes: Routes = [
    {
        path: 'make-order',
        component: OrderComponent,
        canActivate: [orderedGuard]
    },
    {
        path: 'redeem-code',
        component: RedeemCodeComponent,
        canActivate: [redeemableGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {}