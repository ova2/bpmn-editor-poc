import {EObject} from "./EObject";
import {EAnnotation} from "./EAnnotation";


export class EModelElement extends EObject {
	eAnnotations: EAnnotation[] = [];
}
