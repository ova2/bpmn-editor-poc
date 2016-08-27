import {NgModule}      from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

import {AppComponent} from "./app.component";
import {MainComponent}  from "./main/main.component";
import {ConfiguredRoutingModule} from "./app.routing";
import {SvgMasterComponent} from "./svg/svg-master.component";
import {CanvasMasterComponent} from "./canvas/canvas-master.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ConfiguredRoutingModule
    ],
    declarations: [
        AppComponent,
        MainComponent,
        SvgMasterComponent,
        CanvasMasterComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
