import {IShape} from "./IShape";
import {Path} from "./Path";
import {Bounds} from "./Bounds";
export class Rectangle implements IShape
{
	public get x(): number
	{
		return this._x;
	}

	public set x(value: number)
	{
		this._x = value;
	}

	public get y(): number
	{
		return this._y;
	}

	public set y(value: number)
	{
		this._y = value;
	}

	public get width(): number
	{
		return this._width;
	}

	public set width(value: number)
	{
		this._width = value;
	}

	public get height(): number
	{
		return this._height;
	}

	public set height(value: number)
	{
		this._height = value;
	}

	constructor(x: number, y: number, width: number, height: number)
	{
		this._x = x;
		this._y = y;
		this._width = width;
		this._height = height;
	}

	public getBounds()
	{
		return new Bounds( this.x, this.y, this.width, this.height);
	}

	public getPath(): Path
	{
		let path: Path = new Path();
		path.moveTo(this._x, this._y);
		path.lineTo(this._x + this._width, this._y);
		path.lineTo(this._x + this._width, this._y + this._height);
		path.lineTo(this._x, this._y + this._height);
		path.close();
		return path;
	}





	private _x: number;

	private _y: number;

	private _width: number;

	private _height: number;
}
