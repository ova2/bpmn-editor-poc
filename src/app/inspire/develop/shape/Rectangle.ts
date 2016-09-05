
import {Bounds} from "../geometry/Bounds";
import {Shape} from "../Shape";
import {AbstractGraphics} from "../AbstractGraphics";
import {GraphicContext} from "../GraphicContext";
import {Color} from "../graphics/Color";
import {Resource} from "../graphics/Resource";


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

	public draw( graphics:AbstractGraphics, graphicsContext:GraphicContext )
	{
		let foreGroundColor:Resource = graphicsContext.getForeGround();
		if( typeof foreGroundColor === "Color")
		{
			graphics.pushState();

			graphics.setForegroundColor( <Color> foreGroundColor );
			graphics.drawRectangle( this.bounds.getX(), this.bounds.getY(), this.bounds.getWidth(), this.bounds.getHeight());

			graphics.popState();
		}
	}

	private bounds:Bounds;
}
