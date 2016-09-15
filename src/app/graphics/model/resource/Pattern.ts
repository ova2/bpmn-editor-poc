import {Color} from "./Color";
import {Resource} from "./Resource";
import {Point} from "../geometry/Point";

export class StopColor
{
	constructor( stop:number, color:Color)
	{
		this.stop = stop;
		this.color = color;
	}

	public getStop():number
	{
		return this.stop;
	}

	public getColor():Color
	{
		return this.color;
	}

	private color:Color;
	private stop:number;
}

export enum PatternType
{
	LINEAR,RADIAL,IMAGE
}

export class Pattern extends Resource
{

	constructor(patternType:PatternType, p1?:Point, p2?:Point )
	{
		super();

		this.stopColors = new Array<StopColor>();
		this.points = new Array<Point>();

		this.type = patternType;

		if( p1 != null )
		{
			this.points.push(p1);
		}

		if( p2 != null )
		{
			this.points.push(p2);
		}
	}

	public getStopColors():Array<StopColor>
	{
		return this.stopColors;
	}

	public getType():PatternType
	{
		return this.type;
	}

	public getPoints():Array<Point>
	{
		return this.points;
	}

	public addStopColor( stop:number, color:Color)
	{
		this.stopColors.push( new StopColor(stop,color));
	}

	private stopColors:Array<StopColor>;
	private type:PatternType;
	private points:Array<Point>;

}
