import {Injectable} from "@angular/core";
import {NodeElement} from "../model/NodeElement";
import {Bounds} from "../model/geometry/Bounds";


@Injectable()
export abstract class DrawingService
{

	public abstract initSurface(element: Element): void;

	public abstract getSurface(): any;

	public abstract draw(nodeElement:NodeElement): void;

	public abstract handleResize( width:number, height:number):void;

	public getViewPort():Bounds
	{
		return this.viewPort;
	}

	public getZoomFactor():number
	{
		return this.zoomFactor * DrawingService.graphicsScaleFactor;
	}

	public setZoomFactor( zoomFactor:number) : void
	{
		this.zoomFactor = zoomFactor;
	}


	private viewPort:Bounds = new Bounds(0,0,100,100);
	private zoomFactor:number = 1.0;
	public static graphicsScaleFactor:number = 2.0;

}
