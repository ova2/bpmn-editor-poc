import {Component, ElementRef, AfterViewInit, ViewChild} from "@angular/core";

import {DrawingService} from "../common/api/drawing.service";
import {CanvasDrawingService} from "./canvas-drawing.service";
import {DataLoadService} from "../../data-access/dataload.service";

@Component({
    selector: "bpm-canvas-drawing",
    templateUrl: "canvas-drawing.component.html",
    providers: [{provide: DrawingService, useClass: CanvasDrawingService}]
})
export class CanvasDrawingComponent implements AfterViewInit {

    @ViewChild("surface")
    surface: ElementRef;

    private drawingService: DrawingService;

    private dataLoadService: DataLoadService;

    constructor(drawingService: DrawingService, dataLoadService: DataLoadService) {
        this.drawingService = drawingService;
        this.dataLoadService = dataLoadService;
    }

    ngAfterViewInit() {
        let element: Element = this.surface.nativeElement;
        this.drawingService.initSurface(element);

        this.dataLoadService.getPayload().subscribe(
            shapes => this.drawingService.draw(shapes),
            error => console.log(error)
        );
    }
}
