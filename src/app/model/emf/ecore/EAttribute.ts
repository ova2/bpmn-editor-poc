import {EStructuralFeature} from "./EStructuralFeature";
import {EDataType} from "./EDataType";

export class EAttribute extends EStructuralFeature {
	isID: boolean;
	eDataType: EDataType;
}
