
import {Bounds} from "../geometry/Bounds";
import {Shape} from "./Shape";
import {GraphicContext} from "../GraphicContext";
import {DrawingService} from "../../api/drawing.service";


export class Rectangle extends Shape
{
	constructor( rect:Bounds)
	{
		super();
		this.bounds = rect;
	}

	public getBounds():Bounds
	{
		return this.bounds;
	}

	public setBounds( rect:Bounds)
	{
		this.bounds = rect;
	}

	public draw( drawingService: DrawingService, graphicsContext:GraphicContext )
	{

	}

	private bounds:Bounds;
}
