import {Component} from "@angular/core";

import {BaseDrawingComponent} from "../common/base-drawing.component";
import {DrawingService} from "../common/api/drawing.service";
import {SvgDrawingService} from "./svg-drawing.service";
import {DataLoadService} from "../../data-access/dataload.service";

@Component({
    selector: "bpm-svg-drawing",
    templateUrl: "svg-drawing.component.html",
    providers: [{provide: DrawingService, useClass: SvgDrawingService}]
})
export class SvgDrawingComponent extends BaseDrawingComponent {

    constructor(drawingService: DrawingService, dataLoadService: DataLoadService) {
        super(drawingService, dataLoadService);
    }
}
