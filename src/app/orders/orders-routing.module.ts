import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { OrderComponent } from "./order/order.component";
import { RedeemCodeComponent } from "./redeem-code/redeem-code.component";
import { orderedGuard } from "../Guards/ordered.guard";
import { roleGuard } from "../Guards/role.guard";

const routes: Routes = [
    {
        path: 'make-order',
        component: OrderComponent,
        canActivate: [roleGuard, orderedGuard],
        data: { roles: ['user'], excludedRoles: ['activated', 'admin'], orderState: false }
    },
    {
        path: 'redeem-code',
        component: RedeemCodeComponent,
        canActivate: [roleGuard, orderedGuard],
        data: { roles: ['user'], excludedRoles: ['activated', 'admin'], orderState: true }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {}