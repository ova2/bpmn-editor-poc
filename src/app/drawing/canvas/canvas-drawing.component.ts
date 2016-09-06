import {HostListener,Component, ElementRef, AfterViewInit, ViewChild} from "@angular/core";


import {DrawingService} from "../common/api/drawing.service";
import {CanvasDrawingService} from "./canvas-drawing.service";
import {DataLoadService} from "../../data-access/dataload.service";
import {Rectangle} from "../common/model/geometry/Rectangle";
import {Path} from "../common/model/geometry/Path";
import {NodeElement} from "../common/model/NodeElement";
import {ShapeElement} from "../common/model/ShapeElement";
import {TypedJSON} from "../../util/typed-json";

@Component({
	selector: "bpm-canvas-drawing",
	templateUrl: "canvas-drawing.component.html",
	providers: [{provide: DrawingService, useClass: CanvasDrawingService}]
})
export class CanvasDrawingComponent implements AfterViewInit
{

	@ViewChild("surface")
	surface: ElementRef;

	private drawingService: DrawingService;

	private dataLoadService: DataLoadService;

	constructor(drawingService: DrawingService, dataLoadService: DataLoadService) {
		this.drawingService = drawingService;
		this.dataLoadService = dataLoadService;
	}

	@HostListener("click") onClick()
	{
		console.log("Mouse Click");
	}

	@HostListener("mousemove") onMouseMove()
	{
		console.log("Mouse Move");
		this.drawingService.draw();
	}


	ngAfterViewInit() {
		let element: Element = this.surface.nativeElement;
		this.drawingService.initSurface(element);

		let rootNodeElement:NodeElement = new NodeElement("ROOT.NODE");

		let shapeElement:ShapeElement = new ShapeElement("SHAPE.NODE");
		rootNodeElement.getShapeElements().push(shapeElement);

		shapeElement.getShapes().push( new Rectangle( 10, 10, 100, 100 ) );

		let jsonString = TypedJSON.stringify(rootNodeElement);


		console.log("Root: " + jsonString);
		let object = TypedJSON.parse(jsonString,NodeElement);

		console.log("Object: " + object);












		// this.dataLoadService.getPayload().subscribe(
		//	shapes => this.drawingService.draw(shapes),
		// 	error => console.log(error)
		// );
	}
}
