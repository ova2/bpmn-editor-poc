


import {UId} from "../util/UId";
export class NamedElement
{
	constructor(name:string, uId?:string)
	{
		this.name = name;
		if( uId == null )
		{
			this.uId = UId.createUID();
		}
		else
		{
			this.uId = uId;
		}
	}

	public getName():string
	{
		return this.name;
	}

	public setName( name:string )
	{
		this.name = name;
	}

	public getUId():string
	{
		return this.uId;
	}

	public setUId( uId:string )
	{
		this.uId = uId;
	}


	// Name
	private name:string;

	// UId
	private uId:string;
}
