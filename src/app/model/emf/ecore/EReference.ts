import {EStructuralFeature} from "./EStructuralFeature";
import {EClass} from "./EClass";
import {EAttribute} from "./EAttribute";
export class EReference extends EStructuralFeature {
	isContainment: boolean;
	isContainer: boolean;
	isResolveProxies: boolean;
	eOpposite: EReference;
	eReferenceType: EClass;
	eKeys: EAttribute[] = [];
}
