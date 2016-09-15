import {Point} from "../model/geometry/Point";
export class DebugHelper
{
	public static debugMouseEvent( mouseEvent:MouseEvent, worldPoint?:Point):void
	{
		let altKeyDown:string = mouseEvent.altKey ? "A" : "";
		let shiftKeyDown:string = mouseEvent.shiftKey ? "S" : "";
		let ctrlKeyDown:string = mouseEvent.ctrlKey ? "C" : "";
		let metaKeyDown:string = mouseEvent.metaKey ? "M" : "";

		let leftButtonDown:string = ((mouseEvent.buttons & 1) == 1) ? "L" : "";
		let rightButtonDown:string = ((mouseEvent.buttons & 2) == 2) ? "R" : "";
		let wheelButtonDown:string = ((mouseEvent.buttons & 4) == 4) ? "W" : "";

		let worldPosition:string = "";

		if( worldPoint != null )
		{
			worldPosition = `Word: (${worldPoint.getX()},${worldPoint.getY()}) `;
		}

		console.log( `MouseEvent: Type:${mouseEvent.type} Pos: (${mouseEvent.clientX},${mouseEvent.clientY}) ${worldPosition} Buttons: ${leftButtonDown}${wheelButtonDown}${rightButtonDown} Keys: ${altKeyDown}${shiftKeyDown}${ctrlKeyDown}${metaKeyDown}`);
	}
}
