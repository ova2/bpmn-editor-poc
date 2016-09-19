import {Resource} from "./Resource";
import {Color} from "./Color";
export class Shadow extends Resource
{


	public get color(): Color
	{
		return this._color;
	}

	public set color(value: Color)
	{
		this._color = value;
	}

	public get offsetX(): number
	{
		return this._offsetX;
	}

	public set offsetX(value: number)
	{
		this._offsetX = value;
	}

	public get offsetY(): number
	{
		return this._offsetY;
	}

	public set offsetY(value: number)
	{
		this._offsetY = value;
	}

	constructor( color:Color, offsetX:number, offsetY:number)
	{
		super();
		this._color = color;
		this._offsetX = offsetX;
		this._offsetY = offsetY;
	}

	private _color:Color;
	private _offsetX:number;
	private _offsetY:number;
}
