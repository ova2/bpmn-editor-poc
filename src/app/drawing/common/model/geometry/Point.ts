export class Point
{

	constructor( x:number, y:number )
	{
		this.x = x;
		this.y = y;
	}

	public getX():number
	{
		return this.x;
	}

	public getY():number
	{
		return this.y;
	}

	public setX( x:number )
	{
		this.x = x;
	}

	public setY( y:number)
	{
		this.y = y;
	}

	// X Coordinate
	private x:number;

	// Y Coordinate
	private y:number;
}
