import { RouterModule, Routes } from "@angular/router";
import { VideosListComponent } from "./videos-list/videos-list.component";
import { NgModule } from "@angular/core";
import { VideoPageComponent } from "./video-page/video-page.component";
import { roleGuard } from "../Guards/role.guard";

const routes : Routes = [
    {
        path: '',
        component: VideosListComponent,
        canActivate: [roleGuard],
        data: { roles: ['activated', 'admin'] }
    },
    {
        path: ':id',
        component: VideoPageComponent,
        canActivate: [roleGuard],
        data: { roles: ['activated', 'admin'] }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VideosRoutingModule {}