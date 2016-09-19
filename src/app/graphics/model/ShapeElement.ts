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
	public get shapes(): Array<IGeometry>
	{
		return this._shapes;
	}

	public get resources(): Array<Resource>
	{
		return this._resources;
	}

	public get type(): ShapeElementType
	{
		return this._type;
	}
	constructor(name:string, type:ShapeElementType, shape?:IGeometry)
	{
		super( name );
		this._type = type;
		if( shape != null )
		{
			this._shapes.push(shape);
		}

	}

	public dump( indent:number)
	{
		let indentStr:string = Utils.indent(indent, " " );
	}



	public getBounds():Bounds
	{
		let bounds:Bounds = null;

		for( let iGeometry of this._shapes )
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

	private _shapes:Array<IGeometry> = new Array<IGeometry>();

	private _resources:Array<Resource> = new Array<Resource>();

	private _type:ShapeElementType = ShapeElementType.STROKE;
}
