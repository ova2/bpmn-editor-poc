import {Shape} from "./Shape";
import {GraphicContext} from "./GraphicContext";
import {NamedElement} from "./NamedElement";
import {Utils} from "./util/Utils";
/**
 * A ShapeElement describes the Shape to draw
 */
export class ShapeElement extends NamedElement
{
	constructor(name:string, shape?:Shape, graphicsContext?:GraphicContext)
	{
		super( name );
		if( shape != null )
		{
			this.shape = shape;
		}

		if( graphicsContext != null )
		{
			this.graphicsContext = graphicsContext;
		}
	}

	public dump( indent:number)
	{
		let indentStr:string = Utils.indent(indent, " " );

		console.log(indentStr + "ShapeElement: " + this.getName() + " UID: " + this.getUId()  + " Shape: " + this.getShape().toString());
	}

	public getShape():Shape
	{
		return this.shape;
	}

	public setShape(shape:Shape)
	{
		this.shape = shape;
	}

	public getGraphicsContext():GraphicContext
	{
		return this.graphicsContext;
	}

	public setGraohicsContext( graphicsContext:GraphicContext )
	{
		this.graphicsContext = graphicsContext;
	}
	// Shape
	private shape: Shape;

	// Graphics Context
	private graphicsContext: GraphicContext;

}
