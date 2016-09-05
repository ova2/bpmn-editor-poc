import {Component} from "@angular/core";

import {BaseDrawingComponent} from "../common/base-drawing.component";
import {DrawingService} from "../common/api/drawing.service";
import {CanvasDrawingService} from "./canvas-drawing.service";
import {DataLoadService} from "../../data-access/dataload.service";

@Component({
    selector: "bpm-canvas-drawing",
    templateUrl: "canvas-drawing.component.html",
    providers: [{provide: DrawingService, useClass: CanvasDrawingService}]
})
export class CanvasDrawingComponent extends BaseDrawingComponent {

    constructor(drawingService: DrawingService, dataLoadService: DataLoadService) {
        super(drawingService, dataLoadService);
    }
}
