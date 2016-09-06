import {Path} from "./Path";
import {JsonObject,JsonMember,TypedJSON} from "typedjson/js";
@JsonObject
export interface IGeometry
{

	getPath():Path;
}
