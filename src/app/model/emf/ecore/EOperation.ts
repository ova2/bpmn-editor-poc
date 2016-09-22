import {EClassifier} from "./EClassifier";
import {EParameter} from "./EParameter";
import {EClass} from "./EClass";
import {ETypedElement} from "./ETypedElement";
import {EGenericType} from "./EGenericType";
import {ETypedParameter} from "./ETypedParameter";
export class EOperation extends ETypedElement {
	eContainingClass: EClass;
	eParameters: EParameter[] = [];
	eExceptions: EClassifier[] = [];
	eGenericExceptions: EGenericType[] = [];
	eTypeParameter: ETypedParameter[] = [];
}

