import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { signedGuard } from "../Guards/signed.guard";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [signedGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [signedGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}