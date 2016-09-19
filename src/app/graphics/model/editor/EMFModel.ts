import {
	IPackage,
	IClass,
	IEnum,
	ILiteral,
	IAttribute,
	IReference
} from "./interfaces/IPackage";
import {Utils} from "../../util/Utils";




export class EMFPackageFactory
{
	public static inspectEMFClass( iClass:IClass)
	{
		let str:string = `Class: ${iClass.name}`;
		if( iClass.extends != null)
		{

			str += " extends ";
			for( let classname in iClass.extends)
			{
				str += `${classname} `;
			}
		}
		console.log( str );
	}
	public static inspectEMFPackage( iPackage:IPackage )
	{
		console.log("Parsing Package: " + iPackage.package + " " + iPackage.nsPrefix + " " + iPackage.nsURI);
	}

	public static parseEMFPackage( modelObject ):IPackage
	{

		let iPackage:IPackage = <IPackage> modelObject;

		return iPackage;
	}
}
export class EMFModel
{
	constructor( modelName:string )
	{
		this._name = modelName;
	}

	public addPackage( iPackage:IPackage )
	{
		this._packageMap.set(iPackage.package, iPackage);
		EMFPackageFactory.inspectEMFPackage(iPackage);
	}

	public dumpLiteral( indent:number, iLiteral:ILiteral): void
	{
		console.log( Utils.indent( indent, " ") + "Literal: " +  iLiteral.name + " Literal: " + iLiteral.literal + " Value: " + iLiteral.value );
	}

	public dumpAttribute( indent:number, iAttribute:IAttribute): void
	{
		console.log( Utils.indent( indent, " ") + "Attribute: " +  iAttribute.name + " Type: " + iAttribute.type);
	}

	public dumpReference( indent:number, iReference:IReference): void
	{
		console.log( Utils.indent( indent, " ") + "Reference: " +  iReference.name + " Type: " + iReference.type);
	}


	public dumpClass( indent:number, iClass:IClass): void
	{
		let extendsString:string = "";

		if( iClass.extends != null )
		{
			extendsString = " extends ";
			let isFirst:boolean = true;
			for( let extendsItem of iClass.extends )
			{
				if( ! isFirst )
				{
					extendsString += ", ";
				}
				extendsString += " " + extendsItem;
				isFirst = false;
			}
		}
		console.log( Utils.indent( indent, " ") + "Class: " +  iClass.name + extendsString  );

		if( iClass.attributes != null )
		{
			for( let iAttribute of iClass.attributes)
			{
				this.dumpAttribute( indent + 2, iAttribute );
			}
		}

		if( iClass.references != null )
		{
			for( let iReference of iClass.references)
			{
				this.dumpReference( indent + 2, iReference );
			}
		}

	}



	public dumpEnum( indent:number, iEnum:IEnum): void
	{
		console.log( Utils.indent( indent, " ") + "Enum: " +  iEnum.name  + " Default: " + ((iEnum.default != null) ? iEnum.default : "NONE"));
		for( let iLiteral of iEnum.literals )
		{
			this.dumpLiteral( indent +  2, iLiteral);
		}
	}


	public dumpPackage( indent:number, iPackage:IPackage): void
	{
		console.log( Utils.indent( indent, " ") + "Package: " +  iPackage.package + " Prefix: " + iPackage.nsPrefix + " URI: " + iPackage.nsURI);
		if( iPackage.enums != null )
		{
			for (let iEnum of iPackage.enums)
			{
				this.dumpEnum(indent + 2, iEnum);
			}
		}

		if( iPackage.classes != null )
		{

			for (let iClass of iPackage.classes)
			{
				this.dumpClass(indent + 2, iClass);
			}
		}

	}

	public dump():void
	{
		console.log("Dump of EMF Model " + this._name );

		for (let [ key, value ] of Array.from( this._packageMap.entries()))
		{
			let packageName:string = key;
			let iPackage:IPackage = value;
			this.dumpPackage(1,iPackage);

		}
	}

	private _name:string;
	private _packageMap:Map<string,IPackage> = new Map<string,IPackage>();
}
