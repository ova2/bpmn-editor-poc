import {Resource} from "./Resource";


export class Stroke extends Resource
{
	constructor( width:number)
	{
		super();

		this.width = width;

	}

	public getWidth():number
	{
		return this.width;
	}

	public setWidth( width:number )
	{
		this.width =  width;
	}

	// width
	private width:number;

}
