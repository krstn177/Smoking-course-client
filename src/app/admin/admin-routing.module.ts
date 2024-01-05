import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVideoComponent } from './create-video/create-video.component';
import { adminGuard } from '../Guards/admin.guard';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

const routes: Routes = [
    {
        path: 'create-video',
        component: CreateVideoComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'register-admin',
        component: RegisterAdminComponent,
        canActivate: [adminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}