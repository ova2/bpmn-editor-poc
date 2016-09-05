import {NgModule}      from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule}    from "@angular/http";

// Imports for loading & configuring the in-memory web api
import {InMemoryWebApiModule} from "angular2-in-memory-web-api";
import {InMemoryDataService}  from "./backend-mock/in-memory-data.service";

import {AppComponent} from "./app.component";
import {MainComponent}  from "./main/main.component";
import {ConfiguredRoutingModule} from "./app.routing";
import {LayoutComponent} from "./layout/layout.component";
import {SvgMasterComponent} from "./drawing/svg/svg-master.component";
import {CanvasMasterComponent} from "./drawing/canvas/canvas-master.component";
import {PanelComponent} from "./panel/panel.component";
import {PaletteComponent} from "./panel/palette/palette.component";
import {PropertiesComponent} from "./panel/properties/properties.component";
import {ShapesComponent} from "./panel/shapes/shapes.component";
import {ToolbarComponent} from "./panel/toolbar/toolbar.component";
import {CanvasDirective} from "./drawing/canvas/canvas.directive";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        ConfiguredRoutingModule
    ],
    declarations: [
        AppComponent,
        MainComponent,
        PanelComponent,
        ToolbarComponent,
        PaletteComponent,
        PropertiesComponent,
        ShapesComponent,
        LayoutComponent,
        SvgMasterComponent,
        CanvasMasterComponent,
        CanvasDirective
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
