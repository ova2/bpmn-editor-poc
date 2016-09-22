import {EObject} from "./EObject";
export class EResolvable
{
	public getPropertyValue(): string {
	return this._propertyValue;
}


public getEObject(): EObject {
	return this._eObject;
}


public getPropertyName(): string {
	return this._propertyName;
}

constructor(propertyValue: string, eObject: EObject, propertyName: string) {


	this._propertyValue = propertyValue;
	this._eObject = eObject;
	this._propertyName = propertyName;
}

private _propertyValue: string;
private _eObject: EObject;
private _propertyName: string;

}
