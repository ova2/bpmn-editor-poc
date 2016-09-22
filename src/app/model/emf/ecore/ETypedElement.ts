import {ENamedElement} from "./ENamedElement";
import {EClassifier} from "./EClassifier";
import {EGenericType} from "./EGenericType";
export class ETypedElement extends ENamedElement {
	isOrdered: boolean;
	isUnique: boolean;
	lowerBound: number;
	upperBound: number;
	isMany: boolean;
	isRequired: boolean;
	eType: EClassifier;
	eGenericType: EGenericType;
}
