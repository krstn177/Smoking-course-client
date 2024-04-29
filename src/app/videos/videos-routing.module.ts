import { RouterModule, Routes } from "@angular/router";
import { VideosListComponent } from "./videos-list/videos-list.component";
import { NgModule } from "@angular/core";
import { activatedGuard } from "../Guards/activated.guard";
import { VideoPageComponent } from "./video-page/video-page.component";
import { irregularGuard } from "../Guards/irregular.guard";

const routes : Routes = [
    {
        path: '',
        component: VideosListComponent,
        canActivate: [irregularGuard]
    },
    {
        path: ':id',
        component: VideoPageComponent,
        canActivate: [irregularGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VideosRoutingModule {}