import {
	Segment,
	SegmentType
} from "./Segment";
import {Point} from "./Point";

export class Path
{

	constructor()
	{
	}

	public lineTo(x: number, y: number): Path
	{
		this.segments.push(new Segment(SegmentType.LINE_TO, new Point(x, y)));
		return this;
	}

	public moveTo(x: number, y: number): Path
	{
		this.segments.push(new Segment(SegmentType.MOVE_TO, new Point(x, y)));
		return this;
	}

	public quadTo(controlX: number, controlY: number, x: number, y: number): Path
	{
		this.segments.push(new Segment(SegmentType.QUAD_TO, new Point(x, y), new Point(controlX, controlY)));
		return this;
	}

	public cubicTo(control1X: number, control1Y: number, control2X: number, control2Y: number, x: number, y: number): Path
	{
		this.segments.push(new Segment(SegmentType.CUBIC_TO, new Point(x, y), new Point(control1X, control1Y), new Point(control2X, control2Y)));
		return this;
	}

	public close(): Path
	{
		this.segments.push(new Segment(SegmentType.CLOSE));
		return this;
	}

	public getSegments():Array<Segment>
	{
		return this.segments;
	}


	private segments: Array < Segment > = new Array<Segment>();
	public static WIND_EVEN_ODD = 0;
	public static WIND_NON_ZERO = 1;
}
