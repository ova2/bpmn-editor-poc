import {EClassifier} from "./EClassifier";
import {EResolveable} from "./EResolvable";
import {EObject} from "./EObject";

export class EResolvableClassifier extends EClassifier implements EResolveable
{
	constructor( type:string, eObject:EObject, propertyName:string )
	{
		super();
		this.type = type;
		this.eObject = eObject;
		this.propertyName = propertyName;
	}

	type:string;
	eObject:EObject;
	propertyName:string;
}
