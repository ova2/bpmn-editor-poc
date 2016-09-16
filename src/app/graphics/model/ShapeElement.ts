import {NamedElement} from "./NamedElement";

import {IGeometry} from "./geometry/IGeometry";
import {Resource} from "./resource/Resource";
import {Utils} from "../util/Utils";
import {Bounds} from "./geometry/Bounds";


/**
 * A ShapeElement describes the Shape to draw
 */

export enum ShapeElementType
{
	STROKE, FILL
}


export class ShapeElement extends NamedElement
{
	constructor(name:string, type:ShapeElementType, shape?:IGeometry)
	{
		super( name );
		this.type = type;
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

	public getResources():Array<Resource>
	{
		return this.resources;
	}

	public getType():ShapeElementType
	{
		return this.type;
	}

	public getBounds():Bounds
	{
		let bounds:Bounds = null;

		for( let iGeometry of this.shapes )
		{
			if( bounds == null )
			{
				bounds = iGeometry.getBounds().copy();
			}
			else
			{
				bounds.union( iGeometry.getBounds());
			}
		}

		return bounds;
	}

	private shapes:Array<IGeometry> = new Array<IGeometry>();

	private resources:Array<Resource> = new Array<Resource>();

	private type:ShapeElementType = ShapeElementType.STROKE;
}
