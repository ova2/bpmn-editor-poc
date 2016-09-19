import {Resource} from "./Resource";

export enum LineJoin
{
	BEVEL,ROUND,MITER
}

export class Stroke extends Resource
{
	public get lineJoin(): LineJoin
	{
		return this._lineJoin;
	}

	public set lineJoin(value: LineJoin)
	{
		this._lineJoin = value;
	}

	constructor( width:number, lineJoin?:LineJoin)
	{
		super();

		this.width = width;
		if( lineJoin != null )
		{
			this._lineJoin = lineJoin;
		}

	}

	public getWidth():number
	{
		return this.width;
	}

	public setWidth( width:number )
	{
		this.width =  width;
	}

	// width
	private width:number;

	// Line Join
	private _lineJoin:LineJoin;

}
