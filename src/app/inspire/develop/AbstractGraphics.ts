import {Rectangle} from "./shape/Rectangle";
import {GraphicContext} from "./GraphicContext";
import {Resource} from "./graphics/Resource";
export abstract class AbstractGraphics
{

	public abstract pushState():void;
	public abstract popState():void;

	public abstract setForegroundColor(resource:Resource):void;

	public abstract drawRectangle( x:number, y:number, width:number, height:number):void;

	public abstract fillRectangle( x:number, y:number, width:number, height:number):void;


}
