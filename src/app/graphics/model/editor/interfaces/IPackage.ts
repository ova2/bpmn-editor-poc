export interface IAttribute
{

	name:string;
	type:string;
	lowerBound:number;
	upperBound:number;
	default:string;
}

export interface IReference
{
	name:string;
	type:string;
	lowerBound:number;
	upperBound:number;
}

export interface ILiteral
{
	name:string;
	literal:string;
	value:string;
}



export interface IEnum
{
	name:string;
	default:string;
	literals:ILiteral[];
}

export interface IClass
{
	name:string;
	attributes:IAttribute[];
	references:IReference[];
	extends:string[];

}

export interface IPackage
{
	package:string;
	nsPrefix:string;
	nsURI:string;
	enums:IEnum[];
	classes:IClass[];
}
