import {
	Component,
	ViewChild,
	ElementRef,
	AfterViewInit
} from "@angular/core";

import {DrawingService} from "../common/api/drawing.service";
import {DataLoadService} from "../../data-access/dataload.service";
import {SvgDrawingService} from "./svg-drawing.service";

@Component({
	selector: "bpm-svg-drawing",
	templateUrl: "svg-drawing.component.html",
	providers: [{provide: DrawingService, useClass: SvgDrawingService}]
})

export class SvgDrawingComponent implements AfterViewInit
{

	@ViewChild("surface") surface: ElementRef;

	private drawingService: DrawingService;

	private dataLoadService: DataLoadService;

	constructor(drawingService: DrawingService, dataLoadService: DataLoadService)
	{
		this.drawingService = drawingService;
		this.dataLoadService = dataLoadService;
	}

	ngAfterViewInit()
	{
		let element: Element = this.surface.nativeElement;
		this.drawingService.initSurface(element);

		this.dataLoadService.getPayload().subscribe(shapes => this.drawingService.draw(shapes), error => console.log(error));
	}
}