import {DebugHelper} from "../util/DebugHelper";
export class MouseController
{

	public handleMouseEvent( mouseEvent:MouseEvent ):void
	{
		DebugHelper.debugMouseEvent(mouseEvent);
	}
}
