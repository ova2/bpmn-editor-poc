import {NamedElement} from "./NamedElement";
import {Utils} from "../../../inspire/develop/util/Utils";
import {IGeometry} from "./geometry/IGeometry";


/**
 * A ShapeElement describes the Shape to draw
 */

export class ShapeElement extends NamedElement
{
	constructor(name:string, shape?:IGeometry)
	{
		super( name );
		if( shape != null )
		{
			this.shapes.push(shape);
		}

	}

	public dump( indent:number)
	{
		let indentStr:string = Utils.indent(indent, " " );
	}

	public getShapes():Array<IGeometry>
	{
		return this.shapes;
	}


	private shapes:Array<IGeometry> = new Array<IGeometry>();

}
