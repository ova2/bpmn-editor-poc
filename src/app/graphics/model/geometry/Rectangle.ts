import {IShape} from "./IShape";
import {Path} from "./Path";
export class Rectangle implements IShape
{

	constructor(x: number, y: number, width: number, height: number)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	public getPath(): Path
	{
		let path: Path = new Path();
		path.moveTo(this.x, this.y);
		path.lineTo(this.x + this.width, this.y);
		path.lineTo(this.x + this.width, this.y + this.height);
		path.lineTo(this.x, this.y + this.height);
		path.close();
		return path;
	}


	private x: number;

	private y: number;

	private width: number;

	private height: number;
}
