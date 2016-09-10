import {HostListener, Component, ElementRef, AfterViewInit, ViewChild, OnDestroy} from "@angular/core";

import {DrawingService} from "../common/api/drawing.service";
import {CanvasDrawingService} from "./canvas-drawing.service";
import {DataLoadService} from "../../data-access/dataload.service";
import {Rectangle} from "../common/model/geometry/Rectangle";

import {NodeElement} from "../common/model/NodeElement";
import {
	ShapeElement,
	ShapeElementType
} from "../common/model/ShapeElement";
import {
	Pattern,
	PatternType
} from "../common/model/resource/Pattern";
import {Point} from "../common/model/geometry/Point";
import {Color} from "../common/model/resource/Color";

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
        this.drawingService.draw( this.drawingService.getRootNodeElement());
    }

    @HostListener("mousemove") onMouseMove() {
        console.log("Mouse Move");
    }

    @HostListener("window:resize") onResize() {
        this.drawingService.handleResize(window.innerWidth, window.innerHeight);
    }

    private

    ngAfterViewInit() {
        let element: Element = this.surface.nativeElement;
        this.drawingService.initSurface(element);

		let rootNodeElement: NodeElement = new NodeElement("ROOT.NODE");
        let shapeElement: ShapeElement = new ShapeElement("SHAPE.NODE", ShapeElementType.FILL);
        rootNodeElement.getShapeElements().push(shapeElement);

        shapeElement.getShapes().push(new Rectangle(10, 10, 100, 100));
		let rainBowPattern:Pattern = new Pattern( PatternType.LINEAR, new Point(0,0), new Point(200,200));


		rainBowPattern.addStopColor(1/7, Color.createColor("#FF0000"));
		rainBowPattern.addStopColor(2/7, Color.createColor("#FF7F00"));
		rainBowPattern.addStopColor(3/7, Color.createColor("#FFFF00"));
		rainBowPattern.addStopColor(4/7, Color.createColor("#00FF00"));
		rainBowPattern.addStopColor(5/7, Color.createColor("#0000FF"));
		rainBowPattern.addStopColor(6/7, Color.createColor("#4B0082"));
		rainBowPattern.addStopColor(7/7, Color.createColor("#8F00FF"));


		shapeElement.getResources().push( rainBowPattern );

		this.drawingService.setRootNodeElement( rootNodeElement );

        // this.dataLoadService.getPayload().subscribe(
        //	shapes => this.drawingService.draw(shapes),
        // 	error => console.log(error)
        // );
    }

    ngOnDestroy() {
        (<CanvasDrawingService>this.drawingService).eventSubscription.unsubscribe();
    }
}
