import {ENamedElement} from "./ENamedElement";
import {EGenericType} from "./EGenericType";
export class ETypedParameter extends ENamedElement {
	eBounds: EGenericType[] = [];
}

