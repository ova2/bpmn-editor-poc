import {NgModule}      from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

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

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
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
        CanvasMasterComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
