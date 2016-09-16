import {Path} from "./Path";
import {Bounds} from "./Bounds";


export interface IGeometry
{

	getBounds():Bounds;
	getPath():Path;
}
