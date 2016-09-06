import {Injectable} from "@angular/core";

import {DrawingService} from "../common/api/drawing.service";
import {Color} from "../common/model/resource/Color";

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

	public pushState(): void
	{
		this.context2D.save();
	}

	public popState(): void
	{
		this.context2D.restore();
	}

	public setForegroundColor(color: Color): void
	{
		this.context2D.strokeStyle = color.toRGBString();
	}

	public fillRectangle(x: number, y: number, width: number, height: number): void
	{
		// TODO
	}

	public drawRectangle(x:number, y:number, width:number, height:number):void
	{
		this.context2D.rect(x,y,width,height)
	}



	draw(): void
	{

		// Clear Background
		this.context2D.fillStyle = "#CCCCCC";
		this.context2D.fillRect(0,0,this.context2D.canvas.width,this.context2D.canvas.height);

	}
}
