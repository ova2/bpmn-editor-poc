import {ETypedElement} from "./ETypedElement";
import {EClass} from "./EClass";
export class EStructuralFeature extends ETypedElement {
	isTransient: boolean;
	isVolatile: boolean;
	isChangeable: boolean;
	defaultLiteral: string;
	defaultValue: string;
	isUnsettable: boolean;
	isDerived: boolean;
	eContainingClass: EClass;
}
