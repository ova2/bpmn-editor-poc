import {EModelElement} from "./EModelElement";
export class EAnnotation extends EModelElement {
	source: string;
	details: {key: string,value: string}[] = [];

}
