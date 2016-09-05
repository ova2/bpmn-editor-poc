import {AbstractGraphics} from "../AbstractGraphics";
import {Color} from "../graphics/Color";
export class CanvasGraphics extends AbstractGraphics
{

	constructor( canvas:HTMLCanvasElement)
	{
		super();
		this.canvas = canvas;


		if( this.canvas != null )
		{

			this.canvas.addEventListener("load",function (event)
			{
				console.log("LOAD");
			});

			this.context2D = this.canvas.getContext("2d");

			this.canvas.addEventListener("click", function (event)
			{
				console.log("CLICK");
			});
		}
		else
		{
			throw new Error("CANVAS = NULL");
		}
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

// HTML Canvas Element
	private canvas: HTMLCanvasElement ;

	// Canvas Rendering Context
	private context2D: CanvasRenderingContext2D;

}
