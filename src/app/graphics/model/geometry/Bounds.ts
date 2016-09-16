export class Bounds
{
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
	public get x(): number
	{
		return this._x;
	}

	public set x(value: number)
	{
		this._x = value;
	}

	constructor( x:number, y:number, width:number, height:number)
	{
		this.setBounds(x,y,width,height);
	}

	public setBounds(x:number, y:number, width:number, height:number)
	{
		this._x = x;
		this._y = y;
		this._width = width;
		this._height = height;
	}

	public copy():Bounds
	{
		return new Bounds( this.x, this.y, this.width, this.height);
	}

	public static EMPTY_BOUNDS:Bounds = new Bounds(0,0,0,0);

	public containsPoint( x:number, y:number ):boolean
	{
		return (x >= this._x) && ( x <= ( this._x + this._width) ) && (y >= this._y) && ( y <= ( this._y + this._height) )
	}

	public  union( bounds:Bounds):Bounds
	{
		let right: number = Math.max( this.x + this.width, bounds.x + bounds.width);
		let bottom: number = Math.max(this.y + this.height, bounds.y + bounds.height);
		this.x = Math.min(this.x, bounds.x);
		this.y = Math.min(this.y, bounds.y);
		this.width = right - this.x;
		this.height = bottom - this.y;

		return this;
	}



		// X Coordinate
	private _x:number;

	// Y Coordinate
	private _y:number;

	// Width
	private _width:number;

	// Height
	private _height:number;
}
