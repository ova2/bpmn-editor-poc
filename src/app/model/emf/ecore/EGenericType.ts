import {EObject} from "./EObject";
import {EClassifier} from "./EClassifier";
import {ETypedParameter} from "./ETypedParameter";

export class EGenericType extends EObject{
	eUpperBound: EGenericType;
	eTypeArguments: EGenericType[] = [];
	eRawType: EClassifier;
	eLowerBound: EGenericType
	eTypeParameter: ETypedParameter[] = [];
	eClassifier: EClassifier;
}

