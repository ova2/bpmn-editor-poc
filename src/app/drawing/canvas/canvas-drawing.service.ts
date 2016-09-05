import {Injectable} from "@angular/core";

import {DrawingService} from "../common/api/drawing.service";

@Injectable()
export class CanvasDrawingService extends DrawingService
{

	private context2D: CanvasRenderingContext2D;

	initSurface(element: Element): void
	{
		let canvas: HTMLCanvasElement = <HTMLCanvasElement> element;
		this.context2D = canvas.getContext("2d");
	}

	getSurface(): CanvasRenderingContext2D
	{
		return this.context2D;
	}
}
