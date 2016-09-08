
import {Point} from "./Point";

export enum SegmentType
{
	MOVE_TO, LINE_TO, QUAD_TO, CUBIC_TO, CLOSE
}


export class Segment
{
	constructor(type: SegmentType, p?: Point, controlPoint1?: Point, controlPoint2?: Point)
	{
		this.type = type;

		if( p != null )
		{
			this.points.push(p);
		}
		if (controlPoint1 != null)
		{
			this.points.push(controlPoint1);
		}
		if (controlPoint2 != null)
		{
			this.points.push(controlPoint2);
		}
	}

	public getType():SegmentType
	{
		return this.type;
	}

	public getPoints():Array<Point>
	{
		return this.points;
	}


	private type: SegmentType;
	private points: Array<Point> = new Array<Point>();

}
