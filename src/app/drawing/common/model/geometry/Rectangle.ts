import {IShape} from "./IShape";
import {Path} from "./Path";
import {JsonObject,JsonMember,TypedJSON} from "typedjson/js";
@JsonObject
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

	@JsonMember
	private x: number;
	@JsonMember
	private y: number;
	@JsonMember
	private width: number;
	@JsonMember
	private height: number;
}
