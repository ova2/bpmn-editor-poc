import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {SvgMasterComponent} from "./drawing/svg/svg-master.component";
import {CanvasMasterComponent} from "./drawing/canvas/canvas-master.component";

const APP_ROUTES: Routes = [
    {
        path: "",
        redirectTo: "/main",
        pathMatch: "full"
    },
    {
        path: "main",
        component: MainComponent
    },
    {
        path: "svg",
        component: SvgMasterComponent
    },
    {
        path: "canvas",
        component: CanvasMasterComponent
    }
];

export const ConfiguredRoutingModule: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
