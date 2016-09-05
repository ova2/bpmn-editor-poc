export class Bounds
{

	constructor( x:number, y:number, width:number, height:number)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	public getX():number
	{
		return this.x;
	}

	public getY():number
	{
		return this.y;
	}

	public getWidth():number
	{
		return this.width;
	}

	public getHeight():number
	{
		return this.height;
	}

	public setX( x:number )
	{
		this.x = x;
	}

	public setY( y:number )
	{
		this.y = y;
	}

	public setWidth( width:number )
	{
		this.width = width;
	}

	public setHeight( height:number )
	{
		this.height = height;
	}


	// X Coordinate
	private x:number;

	// Y Coordinate
	private y:number;

	// Width
	private width:number;

	// Height
	private height:number;
}
