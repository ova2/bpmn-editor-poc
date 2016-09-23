import {ENamedElement} from "./ENamedElement";
import {EPackage} from "./EPackage";
export class EClassifier extends ENamedElement {
	instanceClassName: string;
	instanceClass: string;
	defaultValue: string;
	ePackage:EPackage;
}
