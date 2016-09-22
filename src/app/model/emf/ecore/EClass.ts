import {EStructuralFeature} from "./EStructuralFeature";
import {EGenericType} from "./EGenericType";
import {EReference} from "./EReference";
import {EOperation} from "./EOperation";
import {EClassifier} from "./EClassifier";
import {EAttribute} from "./EAttribute";



export class EClass extends EClassifier {
	isAbstract: boolean;
	isclass: boolean;
	superTypes: EClass[] = [];
	eStructuralFeatures: EStructuralFeature[] = [];
	eGenericSuperTyes: EGenericType[] = [];
	eAttributes: EAttribute[] = [];
	eReferences: EReference[] = [];
	eContainments: EReference[] = [];
	eOperations: EOperation[] = [];
}

