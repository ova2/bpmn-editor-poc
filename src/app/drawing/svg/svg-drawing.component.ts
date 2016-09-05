import {
	ViewChild,
	ElementRef,
	AfterViewInit
} from "@angular/core";

import {DrawingService} from "./api/drawing.service";
import {DataLoadService} from "../../data-access/dataload.service";

export abstract class BaseDrawingComponent implements AfterViewInit
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
