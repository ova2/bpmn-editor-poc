import {EClassifier} from "./EClassifier";
import {ENamedElement} from "./ENamedElement";
export class EPackage extends ENamedElement {
	nsURI: string;
	nsPrefix: string;
	eSubPackages: EPackage[] = [];
	eSuperPackage: EPackage;
	eClassifiers: EClassifier[] = [];
}
