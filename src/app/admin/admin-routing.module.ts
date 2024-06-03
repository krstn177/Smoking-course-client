import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVideoComponent } from './create-video/create-video.component';
import { roleGuard } from '../Guards/role.guard';

const routes: Routes = [
    {
        path: 'create-video',
        component: CreateVideoComponent,
        canActivate: [roleGuard],
        data: { roles: ['admin']}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}