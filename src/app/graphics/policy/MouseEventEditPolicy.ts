import {EditPolicy} from "./EditPolicy";
export abstract class MouseEventEditPolicy extends EditPolicy
{
	public abstract onMouseDown( mouseEvent:MouseEvent):void;
}
