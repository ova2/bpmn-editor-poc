import {HostListener, Component, ElementRef, AfterViewInit, ViewChild, OnDestroy} from "@angular/core";

import {DrawingService} from "../common/api/drawing.service";
import {CanvasDrawingService} from "./canvas-drawing.service";
import {DataLoadService} from "../../data-access/dataload.service";
import {Rectangle} from "../common/model/geometry/Rectangle";

import {NodeElement} from "../common/model/NodeElement";
import {ShapeElement} from "../common/model/ShapeElement";

@Component({
    selector: "bpm-canvas-drawing",
    templateUrl: "canvas-drawing.component.html",
    providers: [{provide: DrawingService, useClass: CanvasDrawingService}]
})
export class CanvasDrawingComponent implements AfterViewInit, OnDestroy {

    @ViewChild("surface")
    surface: ElementRef;

    private drawingService: DrawingService;
    private dataLoadService: DataLoadService;

    constructor(drawingService: DrawingService, dataLoadService: DataLoadService) {
        this.drawingService = drawingService;
        this.dataLoadService = dataLoadService;
    }

    @HostListener("click") onClick() {
        console.log("Mouse Click");
        this.drawingService.draw(this.rootNodeElement);
    }

    @HostListener("mousemove") onMouseMove() {
        console.log("Mouse Move");
    }

    @HostListener("window:resize") onResize() {
        this.drawingService.handleResize(window.innerWidth, window.innerHeight);
    }

    private rootNodeElement: NodeElement = new NodeElement("ROOT.NODE");

    ngAfterViewInit() {
        let element: Element = this.surface.nativeElement;
        this.drawingService.initSurface(element);

        let shapeElement: ShapeElement = new ShapeElement("SHAPE.NODE");
        this.rootNodeElement.getShapeElements().push(shapeElement);

        shapeElement.getShapes().push(new Rectangle(10, 10, 100, 100));

        // this.dataLoadService.getPayload().subscribe(
        //	shapes => this.drawingService.draw(shapes),
        // 	error => console.log(error)
        // );
    }

    ngOnDestroy() {
        (<CanvasDrawingService>this.drawingService).eventSubscription.unsubscribe();
    }
}
