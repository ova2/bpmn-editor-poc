import {NamedElement} from "./NamedElement";
import {Utils} from "../../../inspire/develop/util/Utils";
import {IGeometry} from "./geometry/IGeometry";
import {JsonObject,JsonMember,TypedJSON} from "typedjson/js";

/**
 * A ShapeElement describes the Shape to draw
 */
@JsonObject
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

	@JsonMember
	private shapes:Array<IGeometry> = new Array<IGeometry>();

}
